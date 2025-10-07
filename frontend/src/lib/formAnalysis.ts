import { ExerciseType, FormFeedback } from "@/types/exercise";
import {
  PoseLandmark,
  calculateAngle,
  PoseLandmarkIndices as PLI,
  isLandmarkVisible,
} from "./poseDetection";

interface ExerciseState {
  phase: "up" | "down" | "neutral";
  repCount: number;
  lastPhaseChange: number;
  minAngleThisRep?: number;
  maxAngleThisRep?: number;
}

export class FormAnalyzer {
  private state: ExerciseState = {
    phase: "neutral",
    repCount: 0,
    lastPhaseChange: Date.now(),
  };

  private exerciseType: ExerciseType;

  constructor(exerciseType: ExerciseType) {
    this.exerciseType = exerciseType;
  }

  reset() {
    this.state = {
      phase: "neutral",
      repCount: 0,
      lastPhaseChange: Date.now(),
    };
  }

  analyze(
    landmarks: PoseLandmark[],
    timestamp: number,
  ): {
    feedback: FormFeedback[];
    repCounted: boolean;
    phase: string;
  } {
    switch (this.exerciseType) {
      case "squat":
        return this.analyzeSquat(landmarks, timestamp);
      case "deadlift":
        return this.analyzeDeadlift(landmarks, timestamp);
      case "pushup":
        return this.analyzePushup(landmarks, timestamp);
      case "row":
        return this.analyzeRow(landmarks, timestamp);
      case "overhead-press":
        return this.analyzeOverheadPress(landmarks, timestamp);
      default:
        return { feedback: [], repCounted: false, phase: "neutral" };
    }
  }

  private analyzeSquat(landmarks: PoseLandmark[], timestamp: number) {
    const feedback: FormFeedback[] = [];
    let repCounted = false;

    // Get key landmarks
    const leftHip = landmarks[PLI.LEFT_HIP];
    const leftKnee = landmarks[PLI.LEFT_KNEE];
    const leftAnkle = landmarks[PLI.LEFT_ANKLE];
    const rightKnee = landmarks[PLI.RIGHT_KNEE];
    const leftShoulder = landmarks[PLI.LEFT_SHOULDER];

    if (
      !isLandmarkVisible(leftHip) ||
      !isLandmarkVisible(leftKnee) ||
      !isLandmarkVisible(leftAnkle)
    ) {
      return { feedback, repCounted, phase: this.state.phase };
    }

    // Calculate knee angle
    const kneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);

    // Track min angle during descent
    if (!this.state.minAngleThisRep || kneeAngle < this.state.minAngleThisRep) {
      this.state.minAngleThisRep = kneeAngle;
    }

    // Check for depth
    const hipBelowKnee = leftHip.y > leftKnee.y;

    // Phase detection
    if (kneeAngle < 100 && this.state.phase !== "down") {
      this.state.phase = "down";
      this.state.lastPhaseChange = timestamp;
    } else if (kneeAngle > 160 && this.state.phase === "down") {
      // Rep completed
      if (this.state.minAngleThisRep && this.state.minAngleThisRep < 100) {
        this.state.repCount++;
        repCounted = true;
        feedback.push({
          timestamp,
          message: "✓ Good rep",
          severity: "info",
          type: "rep_counted",
        });
      } else {
        feedback.push({
          timestamp,
          message: "Insufficient depth",
          severity: "warning",
          type: "depth",
        });
      }
      this.state.phase = "up";
      this.state.minAngleThisRep = undefined;
    }

    // Form checks
    // Check knee valgus (knees caving)
    const kneeDistance = Math.abs(leftKnee.x - rightKnee.x);
    const hipDistance = Math.abs(leftHip.x - landmarks[PLI.RIGHT_HIP].x);

    if (kneeDistance < hipDistance * 0.8 && this.state.phase === "down") {
      feedback.push({
        timestamp,
        message: "⚠️ Knees caving inward",
        severity: "warning",
        type: "knee_valgus",
      });
    }

    // Check forward lean (simplified)
    const shoulderToHipAngle = Math.abs(leftShoulder.x - leftHip.x);
    if (shoulderToHipAngle > 0.15 && this.state.phase === "down") {
      feedback.push({
        timestamp,
        message: "⚠️ Excessive forward lean",
        severity: "warning",
        type: "forward_lean",
      });
    }

    return { feedback, repCounted, phase: this.state.phase };
  }

  private analyzeDeadlift(landmarks: PoseLandmark[], timestamp: number) {
    const feedback: FormFeedback[] = [];
    let repCounted = false;

    const leftHip = landmarks[PLI.LEFT_HIP];
    const leftShoulder = landmarks[PLI.LEFT_SHOULDER];
    const leftKnee = landmarks[PLI.LEFT_KNEE];

    if (!isLandmarkVisible(leftHip) || !isLandmarkVisible(leftShoulder)) {
      return { feedback, repCounted, phase: this.state.phase };
    }

    // Hip angle for phase detection
    const hipHeight = leftHip.y;

    if (hipHeight < 0.6 && this.state.phase !== "down") {
      this.state.phase = "down";
      this.state.lastPhaseChange = timestamp;
    } else if (hipHeight > 0.8 && this.state.phase === "down") {
      this.state.repCount++;
      repCounted = true;
      this.state.phase = "up";
      feedback.push({
        timestamp,
        message: "✓ Rep completed",
        severity: "info",
        type: "rep_counted",
      });
    }

    // Check back rounding (simplified - shoulder ahead of hip)
    const backAngle = Math.abs(leftShoulder.x - leftHip.x);
    if (backAngle > 0.2 && this.state.phase === "down") {
      feedback.push({
        timestamp,
        message: "⚠️ Keep back neutral",
        severity: "warning",
        type: "back_rounding",
      });
    }

    return { feedback, repCounted, phase: this.state.phase };
  }

  private analyzePushup(landmarks: PoseLandmark[], timestamp: number) {
    const feedback: FormFeedback[] = [];
    let repCounted = false;

    const leftShoulder = landmarks[PLI.LEFT_SHOULDER];
    const leftElbow = landmarks[PLI.LEFT_ELBOW];
    const leftWrist = landmarks[PLI.LEFT_WRIST];
    const leftHip = landmarks[PLI.LEFT_HIP];

    if (
      !isLandmarkVisible(leftShoulder) ||
      !isLandmarkVisible(leftElbow) ||
      !isLandmarkVisible(leftWrist)
    ) {
      return { feedback, repCounted, phase: this.state.phase };
    }

    // Calculate elbow angle
    const elbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);

    // Track angles
    if (
      !this.state.minAngleThisRep ||
      elbowAngle < this.state.minAngleThisRep
    ) {
      this.state.minAngleThisRep = elbowAngle;
    }

    // Phase detection
    if (elbowAngle < 90 && this.state.phase !== "down") {
      this.state.phase = "down";
      this.state.lastPhaseChange = timestamp;
    } else if (elbowAngle > 160 && this.state.phase === "down") {
      if (this.state.minAngleThisRep && this.state.minAngleThisRep < 90) {
        this.state.repCount++;
        repCounted = true;
        feedback.push({
          timestamp,
          message: "✓ Good rep",
          severity: "info",
          type: "rep_counted",
        });
      } else {
        feedback.push({
          timestamp,
          message: "Go deeper",
          severity: "warning",
          type: "depth",
        });
      }
      this.state.phase = "up";
      this.state.minAngleThisRep = undefined;
    }

    // Check for sagging hips
    const shoulderHipDistance = Math.abs(leftShoulder.y - leftHip.y);
    if (shoulderHipDistance < 0.15) {
      feedback.push({
        timestamp,
        message: "⚠️ Hips sagging",
        severity: "warning",
        type: "hip_sag",
      });
    }

    return { feedback, repCounted, phase: this.state.phase };
  }

  private analyzeRow(landmarks: PoseLandmark[], timestamp: number) {
    const feedback: FormFeedback[] = [];
    let repCounted = false;

    const leftShoulder = landmarks[PLI.LEFT_SHOULDER];
    const leftElbow = landmarks[PLI.LEFT_ELBOW];
    const leftWrist = landmarks[PLI.LEFT_WRIST];

    if (
      !isLandmarkVisible(leftShoulder) ||
      !isLandmarkVisible(leftElbow) ||
      !isLandmarkVisible(leftWrist)
    ) {
      return { feedback, repCounted, phase: this.state.phase };
    }

    // Simple elbow position tracking
    const elbowBehindShoulder = leftElbow.x < leftShoulder.x - 0.1;

    if (elbowBehindShoulder && this.state.phase !== "down") {
      this.state.phase = "down";
      this.state.lastPhaseChange = timestamp;
    } else if (!elbowBehindShoulder && this.state.phase === "down") {
      this.state.repCount++;
      repCounted = true;
      this.state.phase = "up";
      feedback.push({
        timestamp,
        message: "✓ Rep completed",
        severity: "info",
        type: "rep_counted",
      });
    }

    return { feedback, repCounted, phase: this.state.phase };
  }

  private analyzeOverheadPress(landmarks: PoseLandmark[], timestamp: number) {
    const feedback: FormFeedback[] = [];
    let repCounted = false;

    const leftShoulder = landmarks[PLI.LEFT_SHOULDER];
    const leftElbow = landmarks[PLI.LEFT_ELBOW];
    const leftWrist = landmarks[PLI.LEFT_WRIST];

    if (
      !isLandmarkVisible(leftShoulder) ||
      !isLandmarkVisible(leftElbow) ||
      !isLandmarkVisible(leftWrist)
    ) {
      return { feedback, repCounted, phase: this.state.phase };
    }

    const elbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);

    // Arms overhead (locked out)
    if (
      leftWrist.y < leftShoulder.y - 0.2 &&
      elbowAngle > 160 &&
      this.state.phase !== "up"
    ) {
      this.state.phase = "up";
      this.state.lastPhaseChange = timestamp;
    } else if (leftWrist.y > leftShoulder.y && this.state.phase === "up") {
      this.state.repCount++;
      repCounted = true;
      this.state.phase = "down";
      feedback.push({
        timestamp,
        message: "✓ Rep completed",
        severity: "info",
        type: "rep_counted",
      });
    }

    return { feedback, repCounted, phase: this.state.phase };
  }

  getRepCount(): number {
    return this.state.repCount;
  }
}
