// MediaPipe Configuration
export const MEDIAPIPE_CONFIG = {
  WASM_PATH: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm",
  MODEL_PATH:
    "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
  MIN_DETECTION_CONFIDENCE: 0.5,
  MIN_TRACKING_CONFIDENCE: 0.5,
};

// Camera Configuration
export const CAMERA_CONFIG = {
  IDEAL_WIDTH: 1280,
  IDEAL_HEIGHT: 720,
  FACING_MODE: "user",
  RECOMMENDED_DISTANCE_FEET: [6, 8],
};

// Form Analysis Thresholds
export const FORM_THRESHOLDS = {
  SQUAT: {
    MIN_KNEE_ANGLE: 100,
    MAX_KNEE_ANGLE: 160,
    MIN_DEPTH_ANGLE: 100,
    KNEE_VALGUS_THRESHOLD: 0.8,
    FORWARD_LEAN_THRESHOLD: 0.15,
  },
  PUSHUP: {
    MIN_ELBOW_ANGLE: 90,
    MAX_ELBOW_ANGLE: 160,
    HIP_SAG_THRESHOLD: 0.15,
  },
  DEADLIFT: {
    MIN_HIP_HEIGHT: 0.6,
    MAX_HIP_HEIGHT: 0.8,
    BACK_ANGLE_THRESHOLD: 0.2,
  },
};

// UI Configuration
export const UI_CONFIG = {
  FEEDBACK_DISPLAY_DURATION: 2000, // ms
  REP_COUNTER_FONT_SIZE: "8rem",
  MIN_REP_TIME: 500, // ms - prevent double counting
};

// Privacy & Data
export const PRIVACY_CONFIG = {
  STORE_VIDEO: false,
  STORE_RAW_LANDMARKS: false,
  SESSION_STORAGE_KEY: "workoutSession",
};
