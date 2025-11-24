# ML Service Stub

Rule-based placeholder for the future pose/rep analysis pipeline.

## Files
- `analyzer.py` — public entry points (`analyze_session`, `generate_human_readable_summary`) and stub logic.
- `models.py` — dataclasses for request/response + `ErrorCodes`.
- `config.py` — stub flags, error descriptions, and model config placeholders.
- `pipeline.py` — skeleton for real pose extraction and rep classification (future).

## Interface
- Entry point: `ml_service.analyzer.analyze_session(request: AnalysisRequest) -> SessionFeedback`.
- Input model: `AnalysisRequest` with `session_id`, `user_id`, `exercise`, `video_path`.
- Output model: `SessionFeedback` with per-rep feedback, aggregated errors, and simple next-session plan.
- Optional helper: `generate_human_readable_summary(SessionFeedback) -> str`.

## JSON contract
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
  "reps_total": 10,
  "reps_good": 8,
  "reps_bad": 2,
  "errors_aggregated": {
    "shallow_depth": 2
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

## Behavior (stub)
- Controlled by `STUB_MODE` in `ml_service/config.py`.
- Generates deterministic pseudo-feedback using a seeded RNG (per session/user/exercise).
- Uses `ERROR_DEFINITIONS` for human-facing messages and tips.

## Roadmap to real ML
- Integrate pose-estimation (e.g., MediaPipe/MoveNet) in `extract_pose_features`.
- Implement rep segmentation and feature engineering.
- Train classifier for form errors.
- Wire `_analyze_session_real` to use the pipeline and set `STUB_MODE = False`.
- Fill `ML_MODEL_CONFIG` (weights path, architecture, device selection).
