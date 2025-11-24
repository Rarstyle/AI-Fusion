"""
Skeleton for the future ML-based video analysis pipeline.
"""

from __future__ import annotations

from typing import Any


def extract_pose_features(video_path: str) -> Any:
    """
    Extract pose features from the provided video.

    Intended to run a pose-estimation model (e.g., MediaPipe, MoveNet) and
    produce structured features such as:
    - joint coordinates per frame,
    - joint angle time series,
    - derived stability and velocity metrics.

    Args:
        video_path: Path to the recorded training video on disk.

    Returns:
        Placeholder object for now (empty list). Replace with a structured
        feature container once the ML pipeline is implemented.
    """
    # TODO: implement pose extraction with the chosen model.
    return []


def classify_reps_from_features(features: Any):
    """
    Classify reps and detect form issues from pose features.

    Args:
        features: Pose features returned by `extract_pose_features`, likely a
            sequence of per-frame keypoints and derived signals.

    Returns:
        SessionFeedback object describing rep quality and aggregated errors.
    """
    # TODO: wire real rep segmentation and error classification.
    raise NotImplementedError("Real ML classifier not implemented yet.")
