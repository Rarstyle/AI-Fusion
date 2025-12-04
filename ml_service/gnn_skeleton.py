"""
Experimental GCN model for skeleton graphs built from MediaPipe Pose keypoints.
"""

from __future__ import annotations

from typing import List, Optional, Sequence, Tuple, TYPE_CHECKING

# Keep imports lazy-friendly: the module should load even when torch is absent.
try:
    import torch
    import torch.nn as nn
    import torch.nn.functional as F

    TORCH_AVAILABLE = True
except ImportError:  # pragma: no cover - optional dependency
    TORCH_AVAILABLE = False
    torch = None  # type: ignore
    nn = None  # type: ignore
    F = None  # type: ignore

    class SkeletonGCN:  # type: ignore
        """
        Stub placeholder when PyTorch is not installed.
        """

        def __init__(self, *_, **__):
            raise ImportError("PyTorch is required for SkeletonGCN")

if TYPE_CHECKING:  # Avoid runtime import to keep this module lightweight.
    from .pipeline import PoseFrame, RepSegment

# MediaPipe Pose landmark names (lowercase) in index order.
MEDIAPIPE_LANDMARK_NAMES: List[str] = [
    "nose",
    "left_eye_inner",
    "left_eye",
    "left_eye_outer",
    "right_eye_inner",
    "right_eye",
    "right_eye_outer",
    "left_ear",
    "right_ear",
    "mouth_left",
    "mouth_right",
    "left_shoulder",
    "right_shoulder",
    "left_elbow",
    "right_elbow",
    "left_wrist",
    "right_wrist",
    "left_pinky",
    "right_pinky",
    "left_index",
    "right_index",
    "left_thumb",
    "right_thumb",
    "left_hip",
    "right_hip",
    "left_knee",
    "right_knee",
    "left_ankle",
    "right_ankle",
    "left_heel",
    "right_heel",
    "left_foot_index",
    "right_foot_index",
]


if TORCH_AVAILABLE:

    class GCNLayer(nn.Module):
        def __init__(self, in_features: int, out_features: int):
            super().__init__()
            self.linear = nn.Linear(in_features, out_features)

        def forward(self, x: torch.Tensor, A_hat: torch.Tensor) -> torch.Tensor:
            # x: [batch, num_nodes, in_features]
            # A_hat: [num_nodes, num_nodes]
            h = torch.matmul(A_hat, x)
            h = self.linear(h)
            return h

    class SkeletonGCN(nn.Module):
        """
        Graph Convolutional Network over a pose skeleton graph.

        This model treats each pose landmark as a node, aggregates over a
        normalized adjacency, and produces graph-level logits intended for
        rep classification (good / error types). It is not wired into the
        live rule-based inference path yet; serves as an experimental GNN
        baseline aligned with the squat pipeline.
        """

        def __init__(
            self,
            in_features: int,
            hidden_dim: int = 32,
            out_dim: int = 3,
            landmark_names: Optional[Sequence[str]] = None,
            edges: Optional[Sequence[Tuple[str, str]]] = None,
        ):
            super().__init__()
            self.landmark_names: List[str] = list(landmark_names or MEDIAPIPE_LANDMARK_NAMES)
            self.num_nodes = len(self.landmark_names)

            default_edges: Sequence[Tuple[str, str]] = edges or [
                ("left_hip", "right_hip"),
                ("left_shoulder", "right_shoulder"),
                ("left_shoulder", "left_elbow"),
                ("left_elbow", "left_wrist"),
                ("right_shoulder", "right_elbow"),
                ("right_elbow", "right_wrist"),
                ("left_hip", "left_knee"),
                ("left_knee", "left_ankle"),
                ("right_hip", "right_knee"),
                ("right_knee", "right_ankle"),
                ("left_hip", "left_shoulder"),
                ("right_hip", "right_shoulder"),
                ("left_ankle", "left_heel"),
                ("left_heel", "left_foot_index"),
                ("right_ankle", "right_heel"),
                ("right_heel", "right_foot_index"),
                ("nose", "left_eye"),
                ("nose", "right_eye"),
                ("left_ear", "left_eye"),
                ("right_ear", "right_eye"),
            ]
            A_hat = self._build_normalized_adjacency(default_edges)
            self.register_buffer("A_hat", A_hat)

            self.gcn1 = GCNLayer(in_features, hidden_dim)
            self.gcn2 = GCNLayer(hidden_dim, hidden_dim)
            self.classifier = nn.Linear(hidden_dim, out_dim)

        def _build_normalized_adjacency(self, edges: Sequence[Tuple[str, str]]) -> torch.Tensor:
            """
            Create a symmetric adjacency with self-loops and D^{-1/2} A D^{-1/2} normalization.
            """
            A = torch.zeros((self.num_nodes, self.num_nodes), dtype=torch.float32)
            name_to_idx = {name: idx for idx, name in enumerate(self.landmark_names)}

            for start, end in edges:
                if start not in name_to_idx or end not in name_to_idx:
                    continue
                i, j = name_to_idx[start], name_to_idx[end]
                A[i, j] = 1.0
                A[j, i] = 1.0

            A = A + torch.eye(self.num_nodes, dtype=torch.float32)
            degrees = A.sum(dim=1)
            degrees = torch.clamp(degrees, min=1e-6)
            D_inv_sqrt = torch.diag(torch.pow(degrees, -0.5))
            return D_inv_sqrt @ A @ D_inv_sqrt

        def forward(self, x: torch.Tensor) -> torch.Tensor:
            """
            x: [batch_size, num_nodes, in_features]
            Returns logits [batch_size, out_dim] for graph-level classification.
            """
            h = F.relu(self.gcn1(x, self.A_hat))
            h = F.relu(self.gcn2(h, self.A_hat))
            h_graph = h.mean(dim=1)  # global mean pooling over nodes
            logits = self.classifier(h_graph)
            return logits


def _require_torch():
    if not TORCH_AVAILABLE:
        raise RuntimeError("PyTorch is not available; GNN helpers are disabled.")


def _hip_height_from_frame(frame: "PoseFrame") -> Optional[float]:
    hips = []
    for name in ("left_hip", "right_hip"):
        kp = frame.keypoints.get(name)
        if kp and kp[3] > 0:
            hips.append(kp[1])
    if not hips:
        return None
    return sum(hips) / len(hips)


def build_skeleton_features_from_pose_frame(
    pose_frame: "PoseFrame",
    feature_set: str = "basic",
    landmark_names: Optional[Sequence[str]] = None,
):
    """
    Experimental helper: convert one PoseFrame into node features for SkeletonGCN.

    Returns a torch.Tensor [num_nodes, in_features].
    feature_set:
      - "basic": [x, y, z, visibility]
      - future: extend with velocities/angles (TODO).
    """
    _require_torch()
    names = list(landmark_names or MEDIAPIPE_LANDMARK_NAMES)
    features: List[List[float]] = []
    for name in names:
        keypoint = pose_frame.keypoints.get(name)
        if keypoint:
            x, y, z, visibility = keypoint
        else:
            x = y = z = visibility = 0.0
        features.append([float(x), float(y), float(z), float(visibility)])
    return torch.tensor(features, dtype=torch.float32)  # type: ignore[arg-type]


def build_gnn_input_for_rep(
    rep_segment: "RepSegment",
    feature_set: str = "basic",
    landmark_names: Optional[Sequence[str]] = None,
):
    """
    Experimental helper: collapse a RepSegment into a single-graph input for SkeletonGCN.

    Currently selects a characteristic frame (deepest hip position if available,
    otherwise the middle frame) and returns tensor [1, num_nodes, in_features].
    Intended for kickstarting GNN training/inference alongside the rule-based baseline.
    """
    _require_torch()
    if not rep_segment.frames:
        raise ValueError("rep_segment.frames is empty; cannot build GNN input.")

    hip_frames: List[Tuple[float, "PoseFrame"]] = []
    for frame in rep_segment.frames:
        hip_y = _hip_height_from_frame(frame)
        if hip_y is not None:
            hip_frames.append((hip_y, frame))

    if hip_frames:
        # MediaPipe y increases downward; highest y corresponds to the squat bottom.
        _, chosen = max(hip_frames, key=lambda item: item[0])
    else:
        chosen = rep_segment.frames[len(rep_segment.frames) // 2]

    node_features = build_skeleton_features_from_pose_frame(
        chosen, feature_set=feature_set, landmark_names=landmark_names
    )
    return node_features.unsqueeze(0)
