# ML Service

Rule-based squat analysis plus a deterministic stub for other cases.

## Files
- `analyzer.py` - public entry points (`analyze_session`, `generate_human_readable_summary`), stub path, and real path that calls the rule-based pipeline when `STUB_MODE = False`.
- `pipeline.py` - pose extraction, rep segmentation, rule-based squat scoring, and a future-ready feature extractor.
- `models.py` - dataclasses for request/response + `ErrorCodes`.
- `config.py` - stub flags, rule-based thresholds, model paths, and error descriptions.

## Data flow
1) Video -> `extract_pose_features(video_path)`  
   - Uses MediaPipe Pose (via OpenCV) to read frames, sample every Nth frame, and return a list of `PoseFrame` objects.  
   - `PoseFrame` fields: `frame_index`, `timestamp_ms`, `keypoints` (`joint_name -> (x, y, z, visibility)` in normalized coordinates). Frames with no detection carry an empty dict.
2) Pose frames -> `segment_squat_reps(pose_frames)`  
   - Finite-state machine over hip height ("top", "going_down", "bottom", "going_up").  
   - Emits `RepSegment` objects with `rep_index`, start/end timestamps, and the frames belonging to that rep.
3) Segments -> `analyze_squat_reps(rep_segments)`  
   - Rule-based checks for squat depth, knee tracking, and torso angle.  
   - Returns `SessionFeedback` with per-rep `RepFeedback`, aggregated counts, and a `next_session_plan` derived from `ERROR_DEFINITIONS`.
4) (Future) Segments -> `extract_rep_features(rep_segments)`  
   - Stub that will hold engineered numeric features (angles, amplitudes, durations) for a trainable model.

## Pose graph + GNN (SkeletonGCN)
- The skeleton is represented as a graph where each MediaPipe landmark is a node and anatomical connections are edges; adjacency is normalized with self-loops.  
- Node features are `[x, y, z, visibility]` per joint, producing a matrix `[num_nodes, in_features]`; helpers convert `PoseFrame`/`RepSegment` into tensors.  
- `SkeletonGCN` (simple 2-layer GCN + graph pooling) outputs graph-level logits for rep quality/error classification.  
- This path is experimental and not hooked into production inference; the default system remains rule-based.

## Current behavior
- Default path is the deterministic stub (`STUB_MODE = True`).  
- When `STUB_MODE = False` and `USE_RULE_BASED_ANALYZER = True`, `_analyze_session_real` will run the real squat pipeline. Other exercises currently return a "not supported yet" message with zero reps.
- Thresholds and paths live in `config.py` (`RULE_BASED_THRESHOLDS`, `PATHS`, flags for rule-based vs. ML analyzer).

## JSON contract (unchanged)
Request:
```json
{
  "session_id": "sess_123",
  "user_id": "user_42",
  "exercise": "squat",
  "video_path": "/path/to/video.mp4"
}
```

Response (example):
```json
{
  "exercise": "squat",
  "reps_total": 3,
  "reps_good": 1,
  "reps_bad": 2,
  "errors_aggregated": {
    "shallow_depth": 2,
    "knees_caving": 1
  },
  "per_rep": [
    {"rep_index": 1, "ok": true, "issues": []},
    {"rep_index": 2, "ok": false, "issues": ["shallow_depth"]}
  ],
  "next_session_plan": [
    "Think about sitting between your heels.",
    "Use a box or bench as a depth target."
  ]
}
```

## How backend should call it
1) Direct import (preferred):
```python
from ml_service.analyzer import analyze_session
from ml_service.models import AnalysisRequest

feedback = analyze_session(AnalysisRequest(...))
return feedback.to_dict()
```
2) Future microservice: wrap `analyze_session` behind an HTTP endpoint and return `SessionFeedback.to_dict()` as JSON. Contract stays the same.

## Roadmap to a trainable model
- Extract richer per-rep features in `extract_rep_features` (joint angles, stability, cadence).  
- Train a classifier (RandomForest, GradientBoosting, or a small NN) to predict error labels per rep.  
- Swap `USE_ML_MODEL_ANALYZER` to `True` once the model path/config is populated and `_analyze_session_real` is wired to the ML scorer.
- Collect labeled reps and train `SkeletonGCN` for graph-level rep quality (good/bad + specific faults).  
- Compare F1/precision against the rule-based baseline; tune thresholds or model ensemble accordingly.  
- Explore Graph Attention Network (GAT) or related GNN variants if the simple GCN underfits.
