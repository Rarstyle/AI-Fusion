import {
  PoseLandmarker,
  FilesetResolver,
  PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

export interface PoseLandmark {
  x: number;
  y: number;
  z: number;
  visibility?: number;
}

export class PoseDetectionService {
  private poseLandmarker: PoseLandmarker | null = null;
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm",
      );

      this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize pose detection:", error);
      throw error;
    }
  }

  async detectPose(
    video: HTMLVideoElement,
    timestamp: number,
  ): Promise<PoseLandmarkerResult | null> {
    if (!this.poseLandmarker || !this.initialized) {
      throw new Error("Pose detection not initialized");
    }

    try {
      return this.poseLandmarker.detectForVideo(video, timestamp);
    } catch (error) {
      console.error("Error detecting pose:", error);
      return null;
    }
  }

  close() {
    if (this.poseLandmarker) {
      this.poseLandmarker.close();
      this.poseLandmarker = null;
      this.initialized = false;
    }
  }
}

// Utility functions for calculating angles and distances
export function calculateAngle(
  a: PoseLandmark,
  b: PoseLandmark,
  c: PoseLandmark,
): number {
  const radians =
    Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs((radians * 180.0) / Math.PI);

  if (angle > 180.0) {
    angle = 360 - angle;
  }

  return angle;
}

export function calculateDistance(a: PoseLandmark, b: PoseLandmark): number {
  return Math.sqrt(
    Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2),
  );
}

export function isLandmarkVisible(
  landmark: PoseLandmark,
  threshold = 0.5,
): boolean {
  return landmark.visibility !== undefined && landmark.visibility > threshold;
}

// MediaPipe Pose Landmark indices
export const PoseLandmarkIndices = {
  NOSE: 0,
  LEFT_EYE_INNER: 1,
  LEFT_EYE: 2,
  LEFT_EYE_OUTER: 3,
  RIGHT_EYE_INNER: 4,
  RIGHT_EYE: 5,
  RIGHT_EYE_OUTER: 6,
  LEFT_EAR: 7,
  RIGHT_EAR: 8,
  MOUTH_LEFT: 9,
  MOUTH_RIGHT: 10,
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_ELBOW: 13,
  RIGHT_ELBOW: 14,
  LEFT_WRIST: 15,
  RIGHT_WRIST: 16,
  LEFT_PINKY: 17,
  RIGHT_PINKY: 18,
  LEFT_INDEX: 19,
  RIGHT_INDEX: 20,
  LEFT_THUMB: 21,
  RIGHT_THUMB: 22,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
  LEFT_HEEL: 29,
  RIGHT_HEEL: 30,
  LEFT_FOOT_INDEX: 31,
  RIGHT_FOOT_INDEX: 32,
};
