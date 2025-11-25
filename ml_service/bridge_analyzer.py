import sys
import json
from ml_service.models import AnalysisRequest
from ml_service.analyzer import analyze_session



def to_go_format(session_feedback: dict) -> dict:
    """
    Convert your ML SessionFeedback into the Go AnalysisResult structure.
    """

    reps = []
    for rep in session_feedback["per_rep"]:
        reps.append({
            "repNumber": rep["rep_index"],
            "valid": rep["ok"],
            "feedback": [
                {
                    "type": issue,
                    "message": issue.replace("_", " ").capitalize(),
                    "severity": "warning" if not rep["ok"] else "info",
                    "timestamp": 0,
                }
                for issue in rep["issues"]
            ],
            "timestamp": 0,
        })

    summary = {
        "totalReps": session_feedback["reps_total"],
        "validReps": session_feedback["reps_good"],
        "formAccuracy": (
            100.0 * session_feedback["reps_good"] / session_feedback["reps_total"]
            if session_feedback["reps_total"] > 0 else 0
        ),
        "commonIssues": list(session_feedback["errors_aggregated"].keys()),
    }

    overall_feedback = [
        {
            "type": issue,
            "message": f"Detected issue: {issue}",
            "severity": "warning",
            "timestamp": 0,
        }
        for issue in session_feedback["errors_aggregated"].keys()
    ]

    return {
        "reps": reps,
        "summary": summary,
        "feedback": overall_feedback,
    }


if __name__ == "__main__":
    raw = sys.stdin.read()
    req = json.loads(raw)

    request = AnalysisRequest(
        session_id=req["session_id"],
        user_id=req["user_id"],
        exercise=req["exercise"],
        video_path=req["video_path"],
    )

    output = analyze_session(request)
    structured = output.to_dict()
    
    go_output = to_go_format(structured)

    print(json.dumps(go_output))