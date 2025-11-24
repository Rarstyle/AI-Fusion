"""
Stub analyzer that mimics a future ML-based pipeline.
"""

from __future__ import annotations

import hashlib
import random
from typing import Dict, List

from .config import DEFAULT_EXERCISE, ERROR_DEFINITIONS, SEED_FOR_RANDOM, STUB_MODE
from .models import AnalysisRequest, ErrorCodes, RepFeedback, SessionFeedback
from .pipeline import classify_reps_from_features, extract_pose_features


def analyze_session(request: AnalysisRequest) -> SessionFeedback:
    """
    Analyze a recorded training session and return structured feedback.

    This is a stub (Plan B) implementation: it generates deterministic,
    rule-based feedback for now. In the future this function will load
    and invoke a real ML pipeline to score each rep.
    """
    rng = _make_rng(request)

    # Plan B: current implementation is a deterministic stub that simulates analysis results.
    if STUB_MODE:
        return _analyze_session_stub(request, rng)
    return _analyze_session_real(request)


def generate_human_readable_summary(feedback: SessionFeedback) -> str:
    """
    Produce a short, human-readable summary of the session results.
    """
    main_issue = "none"
    if feedback.errors_aggregated:
        issues_sorted = sorted(
            feedback.errors_aggregated.items(), key=lambda item: item[1], reverse=True
        )
        top_issue, top_count = issues_sorted[0]
        if top_count > 0:
            main_issue = top_issue
    exercise_label = feedback.exercise.capitalize() if feedback.exercise else "Session"
    return (
        f"{exercise_label}: {feedback.reps_total} reps "
        f"({feedback.reps_good} good, {feedback.reps_bad} bad). "
        f"Main issue: {main_issue}."
    )


def _make_rng(request: AnalysisRequest) -> random.Random:
    """
    Create a deterministic RNG based on request data and global seed.
    """
    seed_material = f"{request.session_id}-{request.user_id}-{request.exercise}-{SEED_FOR_RANDOM}"
    seed_bytes = hashlib.md5(seed_material.encode("utf-8")).digest()
    seed_value = int.from_bytes(seed_bytes, "big")
    return random.Random(seed_value)


def _analyze_session_stub(request: AnalysisRequest, rng: random.Random) -> SessionFeedback:
    """
    Rule-based stub that fabricates feedback using deterministic randomness.
    """
    exercise = (request.exercise or "").strip() or DEFAULT_EXERCISE

    reps_total = rng.randint(8, 12)
    reps_bad = rng.randint(0, min(3, reps_total))
    reps_good = reps_total - reps_bad

    per_rep: List[RepFeedback] = []
    selected_errors: List[str] = []
    if reps_bad > 0:
        possible_errors = [ErrorCodes.SHALLOW_DEPTH, ErrorCodes.KNEES_CAVING]
        selected_errors = rng.sample(possible_errors, k=rng.randint(1, len(possible_errors)))

    for rep_index in range(1, reps_total + 1):
        ok = True
        issues: List[str] = []
        if rep_index <= reps_bad:
            ok = False
            chosen_error = rng.choice(selected_errors) if selected_errors else ErrorCodes.SHALLOW_DEPTH
            issues = [chosen_error]
        per_rep.append(RepFeedback(rep_index=rep_index, ok=ok, issues=issues))

    errors_aggregated: Dict[str, int] = {}
    for rep in per_rep:
        for issue in rep.issues:
            errors_aggregated[issue] = errors_aggregated.get(issue, 0) + 1

    next_session_plan = _build_next_session_plan(errors_aggregated)

    return SessionFeedback(
        exercise=exercise,
        reps_total=reps_total,
        reps_good=reps_good,
        reps_bad=reps_bad,
        errors_aggregated=errors_aggregated,
        per_rep=per_rep,
        next_session_plan=next_session_plan,
    )


def _build_next_session_plan(errors_aggregated: Dict[str, int]) -> List[str]:
    """
    Build simple coaching suggestions based on the aggregated errors.
    """
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


def _analyze_session_real(request: AnalysisRequest) -> SessionFeedback:
    """
    Placeholder for the future ML-driven pipeline.
    """
    # TODO: replace with real ML pipeline in _analyze_session_real
    features = extract_pose_features(request.video_path)
    feedback = classify_reps_from_features(features)
    return feedback
