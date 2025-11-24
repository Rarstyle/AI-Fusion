# AI-Fusion

## 1) Project Topic (Short Description)

**Goal.** Turn a standard **phone camera** into a **real-time technique coach** for 5-6 core exercises (squat, hip-hinge/deadlift pattern, push-up, row, overhead press). The app delivers **rep-by-rep cues** (e.g., "knees caving," "back rounding"), **clean-rep counting** (bad reps do not count), and a **short corrective plan** for the next session.

**Why it is important.** Most home workouts lack trustworthy feedback; people stall or get injured due to subtle technique drift and fatigue. Existing products either require **expensive hardware** or provide **broad, generic fitness**. We are **phone-only, privacy-first**, and go **deep on a small set of high-impact lifts**.

**Target users.**
- Home lifters/beginners who train without a coach.
- PT (physical therapy) clients doing at-home protocols.
- Coaches who need quick, remote form checks.

**What is in scope for v1.**
- One fixed camera angle (side/front depending on exercise).
- Real-time cues and rep counting on a mid-range phone.
- On-device processing by default; no raw video uploads.

## ML service stub (Plan B)
- Entry point: `ml_service.analyzer.analyze_session(request: AnalysisRequest) -> SessionFeedback`.
- Request JSON: `session_id`, `user_id`, `exercise`, `video_path`.
- Response JSON: `exercise`, `reps_total`, `reps_good`, `reps_bad`, `errors_aggregated`, `per_rep`, `next_session_plan`.
- Backend usage:
```python
from ml_service.analyzer import analyze_session
from ml_service.models import AnalysisRequest

feedback = analyze_session(AnalysisRequest(...))
return feedback.to_dict()
```
- Roadmap to real ML: add pose estimation, rep segmentation, error classifier, replace `_analyze_session_real`, and set `STUB_MODE = False`.
