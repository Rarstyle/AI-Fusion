from ml_service.analyzer import analyze_session
from ml_service.models import AnalysisRequest, ErrorCodes, RepFeedback, SessionFeedback


def test_basic_analyze_session_stub():
    request = AnalysisRequest(
        session_id="test_session",
        user_id="test_user",
        exercise="squat",
        video_path="/tmp/test_video.mp4",
    )
    feedback = analyze_session(request)

    assert feedback.reps_total >= 0
    assert feedback.reps_good + feedback.reps_bad == feedback.reps_total
    assert len(feedback.per_rep) == feedback.reps_total


def test_analyze_session_is_deterministic():
    request = AnalysisRequest(
        session_id="test_session",
        user_id="test_user",
        exercise="squat",
        video_path="/tmp/test_video.mp4",
    )
    first = analyze_session(request).to_dict()
    second = analyze_session(request).to_dict()

    assert first == second


def test_error_aggregation_from_per_rep():
    per_rep = [
        RepFeedback(rep_index=1, ok=False, issues=[ErrorCodes.SHALLOW_DEPTH]),
        RepFeedback(rep_index=2, ok=False, issues=[ErrorCodes.KNEES_CAVING]),
        RepFeedback(rep_index=3, ok=False, issues=[ErrorCodes.SHALLOW_DEPTH]),
    ]

    def aggregate_errors(reps):
        errors = {}
        for rep in reps:
            for issue in rep.issues:
                errors[issue] = errors.get(issue, 0) + 1
        return errors

    errors_aggregated = aggregate_errors(per_rep)
    feedback = SessionFeedback(
        exercise="squat",
        reps_total=len(per_rep),
        reps_good=0,
        reps_bad=len(per_rep),
        errors_aggregated=errors_aggregated,
        per_rep=per_rep,
        next_session_plan=[],
    )

    assert feedback.errors_aggregated == {
        ErrorCodes.SHALLOW_DEPTH: 2,
        ErrorCodes.KNEES_CAVING: 1,
    }
