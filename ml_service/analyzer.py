"""
Stub analyzer that mimics a future ML-based pipeline.
"""

from __future__ import annotations

import hashlib
import logging
import random
from typing import Dict, List

from .config import (
    DEFAULT_EXERCISE,
    ERROR_DEFINITIONS,
    SEED_FOR_RANDOM,
    STUB_MODE,
    USE_ML_MODEL_ANALYZER,
    USE_RULE_BASED_ANALYZER,
)
from .models import AnalysisRequest, ErrorCodes, RepFeedback, SessionFeedback
from .gnn_skeleton import SkeletonGCN, TORCH_AVAILABLE, build_gnn_input_for_rep
from .pipeline import analyze_squat_reps, extract_pose_features, segment_squat_reps

logger = logging.getLogger(__name__)


def analyze_session(request: AnalysisRequest) -> SessionFeedback:
    """
    Analyze a recorded training session and return structured feedback.

    This is a stub (Plan B) implementation: it generates deterministic,
    rule-based feedback for now. In the future this function will load
    and invoke a real ML pipeline to score each rep. Alongside the rule-based
    baseline, the repo also contains an experimental SkeletonGCN that treats
    pose landmarks as a graph for future training/evaluation against the rules.
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


def analyze_rep_with_gnn(rep_segment):
    """
    Experimental function: turn a RepSegment into a skeleton graph,
    run it through SkeletonGCN, and return logits or predicted classes.

    Currently used as an architectural stub for GNN experiments; the main
    production path still relies on the rule-based engine.
    """
    if not TORCH_AVAILABLE:
        raise RuntimeError("PyTorch is not available, GNN analysis is disabled.")

    import torch  # Local import to avoid hard dependency for rule-based usage.

    # Example initialization. TODO: load trained weights and manage device placement.
    in_features = 4  # [x, y, z, visibility]
    model = SkeletonGCN(in_features=in_features, hidden_dim=32, out_dim=3)
    model.eval()

    x = build_gnn_input_for_rep(rep_segment)  # [1, num_nodes, in_features]
    with torch.no_grad():
        logits = model(x)
    # TODO: softmax logits and map to error classes (good / shallow_depth / knees_caving / etc.).
    return logits


def _analyze_session_real(request: AnalysisRequest) -> SessionFeedback:
    """
    Real rule-based pipeline entry point.
    """
    exercise_raw = (request.exercise or DEFAULT_EXERCISE).strip() or DEFAULT_EXERCISE
    exercise_key = exercise_raw.lower()
    logger.info("Running real analyzer for exercise=%s, video=%s", exercise_key, request.video_path)

    if exercise_key != "squat":
        logger.info("Exercise %s not yet supported by the real analyzer.", exercise_key)
        return SessionFeedback(
            exercise=exercise_raw,
            reps_total=0,
            reps_good=0,
            reps_bad=0,
            errors_aggregated={},
            per_rep=[],
            next_session_plan=["Real analysis for this exercise is not yet supported. Using stub soon."],
        )

    if USE_RULE_BASED_ANALYZER:
        pose_frames = extract_pose_features(request.video_path)
        rep_segments = segment_squat_reps(pose_frames)
        return analyze_squat_reps(rep_segments, exercise=exercise_raw)

    if USE_ML_MODEL_ANALYZER:
        # TODO: plug in ML classifier when available.
        logger.warning("ML model analyzer flag is on but no model is wired yet.")

    return SessionFeedback(
        exercise=exercise_raw,
        reps_total=0,
        reps_good=0,
        reps_bad=0,
        errors_aggregated={},
        per_rep=[],
        next_session_plan=["Real analyzer is disabled. Enable rule-based or ML pipeline in config."],
    )
