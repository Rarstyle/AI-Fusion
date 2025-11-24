import json

from ml_service.analyzer import analyze_session
from ml_service.models import AnalysisRequest


def main():
    request = AnalysisRequest(
        session_id="manual_session",
        user_id="demo_user",
        exercise="squat",
        video_path="C:/Users/user/Desktop/rarstyle/VS Projects/PMLDL_Project/AI-Fusion/squats1_wrong_cutted.mp4",
    )
    feedback = analyze_session(request)
    print(json.dumps(feedback.to_dict(), indent=2))


if __name__ == "__main__":
    main()
