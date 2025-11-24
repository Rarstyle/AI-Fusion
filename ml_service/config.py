"""
Configuration for the ML service stub.
"""

# Flag to keep behavior deterministic and rule-based for now.
STUB_MODE: bool = True

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

# Placeholder for future ML model parameters.
ML_MODEL_CONFIG: dict[str, object] = {
    "weights_path": None,  # TODO: set path to trained model weights
    "architecture": None,  # TODO: set model architecture identifier
    "device": "cpu",  # TODO: allow selecting gpu when available
}
