from ml_service.models import ErrorCodes
from ml_service.pipeline import (
    PoseFrame,
    RepSegment,
    analyze_squat_reps,
    extract_pose_features,
    segment_squat_reps,
)


def _make_pose_frame(
    frame_index: int,
    hip_y: float,
    timestamp_ms: float,
    shoulder_dx: float = 0.0,
    knee_caving: bool = False,
) -> PoseFrame:
    hip_left_x = 0.45
    hip_right_x = 0.55
    shoulder_y = hip_y - 0.15
    shoulder_left_x = hip_left_x + shoulder_dx
    shoulder_right_x = hip_right_x + shoulder_dx

    if knee_caving:
        knee_left_x, knee_right_x = 0.49, 0.51
        ankle_left_x, ankle_right_x = 0.3, 0.7
    else:
        knee_left_x, knee_right_x = 0.4, 0.6
        ankle_left_x, ankle_right_x = 0.4, 0.6

    keypoints = {
        "left_hip": (hip_left_x, hip_y, 0.0, 0.99),
        "right_hip": (hip_right_x, hip_y, 0.0, 0.99),
        "left_shoulder": (shoulder_left_x, shoulder_y, 0.0, 0.99),
        "right_shoulder": (shoulder_right_x, shoulder_y, 0.0, 0.99),
        "left_knee": (knee_left_x, hip_y + 0.15, 0.0, 0.99),
        "right_knee": (knee_right_x, hip_y + 0.15, 0.0, 0.99),
        "left_ankle": (ankle_left_x, hip_y + 0.3, 0.0, 0.99),
        "right_ankle": (ankle_right_x, hip_y + 0.3, 0.0, 0.99),
    }
    return PoseFrame(frame_index=frame_index, timestamp_ms=timestamp_ms, keypoints=keypoints)


def test_segment_squat_reps_detects_two_reps_from_simple_signal():
    hip_trace = [
        0.5,
        0.52,
        0.72,
        0.86,
        0.52,
        0.5,
        0.51,
        0.74,
        0.88,
        0.53,
        0.5,
    ]
    frames = [
        _make_pose_frame(idx, hip_y, idx * 33.0)
        for idx, hip_y in enumerate(hip_trace)
    ]

    segments = segment_squat_reps(frames)

    assert len(segments) == 2
    assert all(isinstance(seg, RepSegment) for seg in segments)
    assert all(seg.frames for seg in segments)


def test_analyze_squat_reps_flags_expected_issues():
    start = _make_pose_frame(0, 0.5, 0.0)
    bottom = _make_pose_frame(1, 0.56, 33.0, shoulder_dx=0.3, knee_caving=True)
    finish = _make_pose_frame(2, 0.52, 66.0)
    segment = RepSegment(rep_index=1, start_ms=0.0, end_ms=66.0, frames=[start, bottom, finish])

    feedback = analyze_squat_reps([segment])

    assert feedback.reps_total == 1
    assert feedback.per_rep[0].ok is False
    assert ErrorCodes.SHALLOW_DEPTH in feedback.per_rep[0].issues
    assert ErrorCodes.KNEES_CAVING in feedback.per_rep[0].issues
    assert ErrorCodes.BACK_ROUNDING in feedback.per_rep[0].issues


def test_extract_pose_features_handles_missing_video_gracefully():
    frames = extract_pose_features("nonexistent_video.mp4")
    assert isinstance(frames, list)
    assert len(frames) >= 0
