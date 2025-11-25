"""
Rule-based pipeline for extracting poses, segmenting reps, and scoring squat quality.
"""

from __future__ import annotations

import logging
import math
import statistics
from pathlib import Path
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

from .config import DEFAULT_EXERCISE, ERROR_DEFINITIONS, RULE_BASED_THRESHOLDS
from .models import ErrorCodes, RepFeedback, SessionFeedback

logger = logging.getLogger(__name__)

try:  # Optional dependencies: handled gracefully in stub environments.
    import cv2
except ImportError:  # pragma: no cover - dependency is optional in CI.
    cv2 = None

try:
    import mediapipe as mp
except ImportError:  # pragma: no cover - dependency is optional in CI.
    mp = None

Keypoint = Tuple[float, float, float, float]  # x, y, z, visibility


@dataclass
class PoseFrame:
    """
    Pose information for a single video frame.
    """

    frame_index: int
    timestamp_ms: float
    keypoints: Dict[str, Keypoint] = field(default_factory=dict)

    @property
    def has_pose(self) -> bool:
        return bool(self.keypoints)


@dataclass
class RepSegment:
    """
    A single squat repetition sliced from continuous pose frames.
    """

    rep_index: int
    start_ms: float
    end_ms: float
    frames: List[PoseFrame] = field(default_factory=list)


@dataclass
class RepFeatures:
    """
    Placeholder for numerical features describing a repetition.
    """

    rep_index: int
    feature_vector: List[float]
    labels: Optional[List[str]] = None


def extract_pose_features(video_path: str, frame_stride: int = 1) -> List[PoseFrame]:
    """
    Extract pose keypoints from a video using MediaPipe Pose.

    Args:
        video_path: path to a local video file.
        frame_stride: sample every Nth frame to trade accuracy for speed.

    Returns:
        List of PoseFrame objects with keypoints per processed frame.
    """
    logger.info("Starting pose extraction from video=%s", video_path)

    if cv2 is None or mp is None:
        logger.warning("Pose extraction dependencies are missing (cv2=%s, mediapipe=%s).", cv2, mp)
        return []

    capture = cv2.VideoCapture(video_path)
    if not capture.isOpened():
        logger.error("Failed to open video: %s", video_path)
        return []

    fps = capture.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(capture.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    pose = mp.solutions.pose.Pose(
        static_image_mode=False,
        model_complexity=1,
        enable_segmentation=False,
        min_detection_confidence=0.5,
        min_tracking_confidence=0.5,
    )

    processed_frames: List[PoseFrame] = []
    frame_index = 0
    try:
        while capture.isOpened():
            success, frame = capture.read()
            if not success:
                break

            if frame_index % frame_stride != 0:
                frame_index += 1
                continue

            timestamp_ms = (frame_index / fps) * 1000.0 if fps else float(frame_index)
            image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = pose.process(image_rgb)

            keypoints: Dict[str, Keypoint] = {}
            if results.pose_landmarks:
                for lm_idx, landmark in enumerate(results.pose_landmarks.landmark):
                    name = mp.solutions.pose.PoseLandmark(lm_idx).name.lower()
                    keypoints[name] = (
                        float(landmark.x),
                        float(landmark.y),
                        float(landmark.z),
                        float(landmark.visibility),
                    )

            processed_frames.append(
                PoseFrame(frame_index=frame_index, timestamp_ms=timestamp_ms, keypoints=keypoints)
            )
            frame_index += 1
    except Exception as exc:  # pragma: no cover - defensive logging for runtime failures.
        logger.exception("Unexpected error during pose extraction: %s", exc)
    finally:
        capture.release()
        pose.close()

    logger.info(
        "Finished pose extraction for %s. Total frames=%s, processed=%s",
        video_path,
        total_frames,
        len(processed_frames),
    )
    return processed_frames


def segment_squat_reps(pose_frames: List[PoseFrame]) -> List[RepSegment]:
    """
    Slice a stream of pose frames into individual squat repetitions.
    """
    logger.info("Starting rep segmentation for %s frames.", len(pose_frames))
    if not pose_frames:
        return []

    hip_heights = [_hip_height(frame) for frame in pose_frames if _hip_height(frame) is not None]
    if not hip_heights:
        logger.warning("No valid hip keypoints found; cannot segment reps.")
        return []

    baseline_window = RULE_BASED_THRESHOLDS["baseline_frame_window"]
    baseline_samples = hip_heights[: int(baseline_window)]
    top_level = statistics.median(baseline_samples) if baseline_samples else statistics.median(hip_heights)

    descent_trigger = RULE_BASED_THRESHOLDS["descent_trigger"]
    min_depth_drop = RULE_BASED_THRESHOLDS["min_depth_drop"]
    ascent_trigger = RULE_BASED_THRESHOLDS["ascent_trigger"]
    top_tolerance = RULE_BASED_THRESHOLDS["top_tolerance"]

    state = "top"
    rep_segments: List[RepSegment] = []
    current_frames: List[PoseFrame] = []
    rep_start_time: Optional[float] = None
    rep_index = 0
    bottom_seen = False
    last_drop: Optional[float] = None
    peak_drop: float = 0.0

    for frame in pose_frames:
        hip_y = _hip_height(frame)
        if hip_y is None or top_level == 0:
            continue

        relative_drop = (hip_y - top_level) / max(top_level, 1e-6)
        prev_drop = last_drop
        last_drop = relative_drop if last_drop is None else last_drop

        if state == "top":
            if relative_drop > descent_trigger:
                state = "going_down"
                current_frames = [frame]
                rep_start_time = frame.timestamp_ms
                bottom_seen = False
                peak_drop = relative_drop
                last_drop = relative_drop
        elif state == "going_down":
            current_frames.append(frame)
            peak_drop = max(peak_drop, relative_drop)
            # Mark bottom if we hit depth threshold.
            if relative_drop >= min_depth_drop:
                state = "bottom"
                bottom_seen = True
            # If we start rising before hitting the strict threshold,
            # still count this as a shallow rep.
            elif prev_drop is not None and relative_drop < prev_drop - 0.01 and peak_drop > descent_trigger:
                bottom_seen = True  # will be flagged as shallow later
                state = "going_up"
            last_drop = relative_drop
        elif state == "bottom":
            current_frames.append(frame)
            if relative_drop < ascent_trigger:
                state = "going_up"
            peak_drop = max(peak_drop, relative_drop)
            last_drop = relative_drop
        elif state == "going_up":
            current_frames.append(frame)
            if relative_drop <= top_tolerance and bottom_seen:
                rep_index += 1
                rep_segments.append(
                    RepSegment(
                        rep_index=rep_index,
                        start_ms=rep_start_time or current_frames[0].timestamp_ms,
                        end_ms=frame.timestamp_ms,
                        frames=current_frames,
                    )
                )
                state = "top"
                current_frames = []
                rep_start_time = None
                bottom_seen = False
                peak_drop = 0.0
                last_drop = None

    if current_frames and bottom_seen:
        # Finalize a rep even if we did not return fully to the top position.
        rep_index += 1
        rep_segments.append(
            RepSegment(
                rep_index=rep_index,
                start_ms=rep_start_time or current_frames[0].timestamp_ms,
                end_ms=current_frames[-1].timestamp_ms,
                frames=current_frames,
            )
        )

    logger.info("Rep segmentation completed. Found %s reps.", len(rep_segments))
    return rep_segments


def analyze_squat_reps(rep_segments: List[RepSegment], exercise: str = DEFAULT_EXERCISE) -> SessionFeedback:
    """
    Rule-based squat quality checks for each segmented repetition.
    """
    if not rep_segments:
        return SessionFeedback(
            exercise=exercise or DEFAULT_EXERCISE,
            reps_total=0,
            reps_good=0,
            reps_bad=0,
            errors_aggregated={},
            per_rep=[],
            next_session_plan=[
                "No reps detected. Make sure the camera sees the whole body and try again."
            ],
        )

    logger.info("Starting squat analysis for %s reps.", len(rep_segments))
    per_rep: List[RepFeedback] = []
    errors_aggregated: Dict[str, int] = {}

    for segment in rep_segments:
        issues: List[str] = []
        start_height = _first_valid_hip_height(segment.frames)
        bottom_frame, bottom_height = _bottom_frame(segment.frames)

        if start_height is None or bottom_height is None:
            per_rep.append(RepFeedback(rep_index=segment.rep_index, ok=False, issues=issues))
            continue

        depth_drop = (bottom_height - start_height) / max(start_height, 1e-6)
        if depth_drop < RULE_BASED_THRESHOLDS["min_depth_drop"]:
            issues.append(ErrorCodes.SHALLOW_DEPTH)

        knee_ratio = _knee_to_ankle_ratio(bottom_frame)
        if knee_ratio is not None and knee_ratio < RULE_BASED_THRESHOLDS["knee_to_ankle_ratio_min"]:
            issues.append(ErrorCodes.KNEES_CAVING)

        torso_angle = _torso_angle(bottom_frame)
        if torso_angle is not None and torso_angle > RULE_BASED_THRESHOLDS["torso_forward_max_deg"]:
            issues.append(ErrorCodes.BACK_ROUNDING)

        ok = len(issues) == 0
        per_rep.append(RepFeedback(rep_index=segment.rep_index, ok=ok, issues=issues))
        for issue in issues:
            errors_aggregated[issue] = errors_aggregated.get(issue, 0) + 1

    reps_total = len(per_rep)
    reps_bad = len([rep for rep in per_rep if not rep.ok])
    reps_good = reps_total - reps_bad

    if errors_aggregated:
        next_session_plan = _build_next_session_plan(errors_aggregated)
    else:
        next_session_plan = [
            "Reps were segmented but issues were inconclusive. Check camera angle and lighting for clearer keypoints."
        ] if reps_bad > 0 else _build_next_session_plan(errors_aggregated)

    logger.info(
        "Squat analysis done. total=%s, good=%s, bad=%s, errors=%s",
        reps_total,
        reps_good,
        reps_bad,
        errors_aggregated,
    )

    return SessionFeedback(
        exercise=exercise or DEFAULT_EXERCISE,
        reps_total=reps_total,
        reps_good=reps_good,
        reps_bad=reps_bad,
        errors_aggregated=errors_aggregated,
        per_rep=per_rep,
        next_session_plan=next_session_plan,
    )


def extract_rep_features(rep_segments: List[RepSegment]) -> List[RepFeatures]:
    """
    Placeholder for future feature engineering pipeline.
    """
    rep_features: List[RepFeatures] = []
    for segment in rep_segments:
        rep_features.append(
            RepFeatures(
                rep_index=segment.rep_index,
                feature_vector=[],
                labels=None,  # TODO: populate labels from manual annotations when available.
            )
        )
        # TODO: compute joint angles, velocity profiles, symmetry metrics, and temporal durations.
    return rep_features


def _build_next_session_plan(errors_aggregated: Dict[str, int]) -> List[str]:
    plan: List[str] = []
    for code, count in errors_aggregated.items():
        if count == 0:
            continue
        definition = ERROR_DEFINITIONS.get(code, {})
        tips = definition.get("coaching_tips", [])
        if tips:
            plan.extend(tips[:2])
        else:
            plan.append(f"Address issue: {code}.")

    if not plan:
        plan.append("Great job! Keep the same technique for the next session.")

    return plan


def _hip_height(frame: PoseFrame) -> Optional[float]:
    visibility_threshold = RULE_BASED_THRESHOLDS["visibility_threshold"]
    hips = [
        frame.keypoints.get("left_hip"),
        frame.keypoints.get("right_hip"),
    ]
    hips = [h for h in hips if h and h[3] >= visibility_threshold]
    if not hips:
        return None
    return sum(h[1] for h in hips) / len(hips)


def _first_valid_hip_height(frames: List[PoseFrame]) -> Optional[float]:
    for frame in frames:
        height = _hip_height(frame)
        if height is not None:
            return height
    return None


def _bottom_frame(frames: List[PoseFrame]) -> Tuple[Optional[PoseFrame], Optional[float]]:
    visibility_threshold = RULE_BASED_THRESHOLDS["visibility_threshold"]
    bottom_candidate: Optional[PoseFrame] = None
    bottom_height: Optional[float] = None

    for frame in frames:
        hips = [
            frame.keypoints.get("left_hip"),
            frame.keypoints.get("right_hip"),
        ]
        hips = [h for h in hips if h and h[3] >= visibility_threshold]
        if not hips:
            continue
        avg_height = sum(h[1] for h in hips) / len(hips)
        if bottom_height is None or avg_height > bottom_height:
            bottom_height = avg_height
            bottom_candidate = frame
    return bottom_candidate, bottom_height


def _knee_to_ankle_ratio(frame: PoseFrame) -> Optional[float]:
    visibility_threshold = RULE_BASED_THRESHOLDS["visibility_threshold"]
    left_knee = frame.keypoints.get("left_knee")
    right_knee = frame.keypoints.get("right_knee")
    left_ankle = frame.keypoints.get("left_ankle")
    right_ankle = frame.keypoints.get("right_ankle")

    points = [left_knee, right_knee, left_ankle, right_ankle]
    if not all(points):
        return None
    if any(p[3] < visibility_threshold for p in points):
        return None

    knee_width = abs(left_knee[0] - right_knee[0])
    ankle_width = abs(left_ankle[0] - right_ankle[0])
    if ankle_width == 0:
        return None
    return knee_width / ankle_width


def _torso_angle(frame: PoseFrame) -> Optional[float]:
    visibility_threshold = RULE_BASED_THRESHOLDS["visibility_threshold"]
    left_shoulder = frame.keypoints.get("left_shoulder")
    right_shoulder = frame.keypoints.get("right_shoulder")
    left_hip = frame.keypoints.get("left_hip")
    right_hip = frame.keypoints.get("right_hip")

    points = [left_shoulder, right_shoulder, left_hip, right_hip]
    if not all(points):
        return None
    if any(p[3] < visibility_threshold for p in points):
        return None

    shoulder_x = (left_shoulder[0] + right_shoulder[0]) / 2.0
    shoulder_y = (left_shoulder[1] + right_shoulder[1]) / 2.0
    hip_x = (left_hip[0] + right_hip[0]) / 2.0
    hip_y = (left_hip[1] + right_hip[1]) / 2.0

    dy = shoulder_y - hip_y
    dx = shoulder_x - hip_x
    if dy == 0:
        return None

    # Use absolute offsets so the angle is measured against the vertical axis
    # regardless of whether the y-axis is pointing down or up in the input space.
    angle_radians = math.atan2(abs(dx), abs(dy))
    return math.degrees(angle_radians)


def render_debug_overlay(
    video_path: str,
    frame_stride: int = 1,
    output_path: Optional[str] = None,
) -> Optional[str]:
    """
    Render a video with pose landmarks and rep ids overlaid for debugging.
    """
    if cv2 is None or mp is None:
        logger.warning("Cannot render overlay: cv2=%s, mediapipe=%s", cv2, mp)
        return None

    pose_frames = extract_pose_features(video_path, frame_stride=frame_stride)
    rep_segments = segment_squat_reps(pose_frames)

    capture = cv2.VideoCapture(video_path)
    if not capture.isOpened():
        logger.error("Failed to open video for overlay: %s", video_path)
        return None

    fps = capture.get(cv2.CAP_PROP_FPS) or 30.0
    width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))

    video_path_obj = Path(video_path)
    if output_path:
        overlay_path = Path(output_path)
    else:
        overlay_path = video_path_obj.with_stem(video_path_obj.stem + "_overlay")

    writer = cv2.VideoWriter(
        str(overlay_path),
        cv2.VideoWriter_fourcc(*"mp4v"),
        fps,
        (width, height),
    )

    frame_lookup: Dict[int, PoseFrame] = {f.frame_index: f for f in pose_frames}
    frame_to_rep: Dict[int, int] = {}
    for seg in rep_segments:
        for f in seg.frames:
            frame_to_rep[f.frame_index] = seg.rep_index

    landmark_enum = list(mp.solutions.pose.PoseLandmark)
    drawing_spec = mp.solutions.drawing_utils.DrawingSpec(
        color=(0, 255, 0),
        thickness=2,
        circle_radius=2,
    )
    font = cv2.FONT_HERSHEY_SIMPLEX

    from mediapipe.framework.formats import landmark_pb2  # type: ignore

    last_rep_id: Optional[int] = None
    last_hip_y: Optional[float] = None

    frame_idx = 0
    while True:
        success, frame = capture.read()
        if not success:
            break

        pose_frame = frame_lookup.get(frame_idx)
        rep_id = frame_to_rep.get(frame_idx, last_rep_id)
        hip_y = _hip_height(pose_frame) if pose_frame else None

        if pose_frame and pose_frame.keypoints:
            landmarks = []
            for lm in landmark_enum:
                kp = pose_frame.keypoints.get(lm.name.lower())
                if kp:
                    x, y, z, visibility = kp
                else:
                    x = y = z = 0.0
                    visibility = 0.0
                landmarks.append(
                    landmark_pb2.NormalizedLandmark(
                        x=float(x),
                        y=float(y),
                        z=float(z),
                        visibility=float(visibility),
                    )
                )
            landmark_list = landmark_pb2.NormalizedLandmarkList(landmark=landmarks)
            mp.solutions.drawing_utils.draw_landmarks(
                frame,
                landmark_list,
                mp.solutions.pose.POSE_CONNECTIONS,
                drawing_spec,
                drawing_spec,
            )

            # Update last seen values only when we have landmarks.
            if rep_id is not None:
                last_rep_id = rep_id
            if hip_y is not None:
                last_hip_y = hip_y

        # Draw text overlays even when landmarks are missing, using last seen values.
        rep_display = last_rep_id if last_rep_id is not None else "-"
        cv2.putText(frame, f"rep {rep_display}", (20, 40), font, 1.0, (0, 255, 255), 2)
        hip_display = hip_y if hip_y is not None else last_hip_y
        if hip_display is not None:
            cv2.putText(
                frame,
                f"hip_y {hip_display:.3f}",
                (20, 70),
                font,
                0.8,
                (255, 255, 0),
                2,
            )

        writer.write(frame)
        frame_idx += 1

    capture.release()
    writer.release()
    logger.info("Rendered overlay to %s (reps=%s)", overlay_path, len(rep_segments))
    return str(overlay_path)
