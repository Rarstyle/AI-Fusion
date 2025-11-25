import json
from pathlib import Path

from ml_service.analyzer import analyze_session
from ml_service.models import AnalysisRequest
from ml_service.pipeline import render_debug_overlay


def main() -> None:
    # Adjust this path if you want to analyze a different video.
    video_path = Path(
        "C:/Users/user/Desktop/rarstyle/VS Projects/PMLDL_Project/AI-Fusion/squats1_wrong_cutted.mp4"
    )

    request = AnalysisRequest(
        session_id="manual_session",
        user_id="demo_user",
        exercise="squat",
        video_path=str(video_path),
    )

    feedback = analyze_session(request)
    print(json.dumps(feedback.to_dict(), indent=2))

    overlay_path = render_debug_overlay(
        video_path=str(video_path),
        frame_stride=1,
        output_path=None,  # set a custom path if you want a specific filename/location
    )
    if overlay_path:
        print(f"Overlay saved to {overlay_path}")
    else:
        print("Overlay could not be created (cv2/mediapipe missing?).")


if __name__ == "__main__":
    main()
