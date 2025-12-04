"""
Small launcher to exercise the experimental SkeletonGCN on a single video.

Usage (from repo root):
    python run_gnn_demo.py --video squats1.mp4 --frame-stride 2

Notes:
- This does NOT replace the rule-based pipeline; it just demonstrates the GNN path.
- Requires PyTorch. If torch is missing, the script will exit with a clear message.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description="Run experimental SkeletonGCN on a squat video.")
    parser.add_argument("--video", type=str, default="squats1.mp4", help="Path to input video.")
    parser.add_argument("--frame-stride", type=int, default=2, help="Sample every Nth frame.")
    parser.add_argument(
        "--device",
        type=str,
        default="cpu",
        help="torch device to place the model on (cpu / cuda if available).",
    )
    args = parser.parse_args()

    try:
        import torch
    except ImportError:
        print("PyTorch is not installed. Install torch to run the GNN demo.", file=sys.stderr)
        return 1

    try:
        from ml_service.gnn_skeleton import SkeletonGCN, build_gnn_input_for_rep
        from ml_service.pipeline import extract_pose_features, segment_squat_reps
    except Exception as exc:  # pragma: no cover - import/runtime guard
        print(f"Failed to import ml_service modules: {exc}", file=sys.stderr)
        return 1

    video_path = Path(args.video)
    if not video_path.exists():
        print(f"Video not found: {video_path}", file=sys.stderr)
        return 1

    print(f"[+] Extracting pose from {video_path} (frame_stride={args.frame_stride})...")
    frames = extract_pose_features(str(video_path), frame_stride=args.frame_stride)
    reps = segment_squat_reps(frames)
    if not reps:
        print("No reps detected in the video; cannot run GNN.", file=sys.stderr)
        return 1

    rep = reps[0]
    print(f"[+] Using rep #{rep.rep_index} with {len(rep.frames)} frames for GNN forward pass.")

    in_features = 4  # [x, y, z, visibility]
    out_dim = 3  # placeholder: adjust to your label set
    model = SkeletonGCN(in_features=in_features, hidden_dim=32, out_dim=out_dim)
    model.to(args.device)
    model.eval()

    x = build_gnn_input_for_rep(rep).to(args.device)  # [1, num_nodes, in_features]

    with torch.no_grad():
        logits = model(x)
        probs = torch.softmax(logits, dim=-1)

    print("[+] GNN logits:", logits.cpu().numpy())
    print("[+] GNN probabilities (softmax):", probs.cpu().numpy())
    print(
        "Note: model uses random init unless you load trained weights; "
        "wire load_state_dict here when you have a checkpoint."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
