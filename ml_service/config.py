"""
Configuration for the ML service stub and rule-based pipeline.
"""

# Flag to keep behavior deterministic and rule-based for now.
STUB_MODE: bool = False

# Switches to pick the implementation path for real analysis.
USE_RULE_BASED_ANALYZER: bool = True
USE_ML_MODEL_ANALYZER: bool = False  # TODO: enable once a trainable model is wired.

# Default exercise fallback when data is incomplete.
DEFAULT_EXERCISE: str = "squat"

# Seed to make stub generation reproducible.
SEED_FOR_RANDOM: int = 42

# Human-readable descriptions and coaching tips for known errors.
ERROR_DEFINITIONS: dict[str, dict[str, object]] = {
    "shallow_depth": {
        "title": "Not deep enough",
        "user_message": "You are not reaching full squat depth.",
        "coaching_tips": [
            "Think about sitting between your heels.",
            "Use a box or bench as a depth target.",
        ],
    },
    "knees_caving": {
        "title": "Knees caving in",
        "user_message": "Your knees are collapsing inward during the squat.",
        "coaching_tips": [
            "Push your knees out as you descend.",
            "Strengthen glutes with banded walks.",
        ],
    },
    "back_rounding": {
        "title": "Back rounding",
        "user_message": "Your lower back is rounding under load.",
        "coaching_tips": [
            "Keep your chest up and brace your core.",
            "Reduce weight and work on hip mobility.",
        ],
    },
}

# Paths to data and models to help future ML integration.
PATHS: dict[str, object] = {
    "data_root": "data",
    "pose_model": None,  # TODO: set MediaPipe/MoveNet weights location if needed.
    "ml_classifier": None,  # TODO: set trained classifier path.
}

# Hyperparameters for rule-based squat analysis.
RULE_BASED_THRESHOLDS: dict[str, float] = {
    "baseline_frame_window": 10,
    "descent_trigger": 0.08,  # relative hip drop to start a rep.
    "min_depth_drop": 0.22,  # relative hip drop needed to count as reaching bottom.
    "ascent_trigger": 0.15,  # relative hip position to start counting ascent.
    "top_tolerance": 0.05,  # how close to baseline to finish a rep.
    "knee_to_ankle_ratio_min": 0.8,  # ratio of knee width to ankle width to avoid caving.
    "torso_forward_max_deg": 35.0,  # max torso lean angle before flagging rounding/lean.
    "visibility_threshold": 0.5,  # minimum keypoint visibility to trust the measurement.
}

# Placeholder for future ML model parameters.
ML_MODEL_CONFIG: dict[str, object] = {
    "weights_path": None,  # TODO: set path to trained model weights
    "architecture": None,  # TODO: set model architecture identifier
    "device": "cpu",  # TODO: allow selecting gpu when available
}
