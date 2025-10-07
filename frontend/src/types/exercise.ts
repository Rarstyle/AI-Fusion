export type ExerciseType =
  | "squat"
  | "deadlift"
  | "pushup"
  | "row"
  | "overhead-press";

export type CameraAngle = "side" | "front";

export interface Exercise {
  id: ExerciseType;
  name: string;
  description: string;
  cameraAngle: CameraAngle;
  icon: string;
  targetMuscles: string[];
  commonErrors: string[];
}

export interface FormFeedback {
  timestamp: number;
  message: string;
  severity: "info" | "warning" | "error";
  type: string;
}

export interface RepData {
  repNumber: number;
  valid: boolean;
  feedback: FormFeedback[];
  timestamp: number;
}

export interface WorkoutSession {
  exerciseId: ExerciseType;
  startTime: number;
  endTime?: number;
  totalReps: number;
  validReps: number;
  invalidReps: number;
  reps: RepData[];
  feedback: FormFeedback[];
}

export interface CorrectivePlan {
  issue: string;
  description: string;
  exercises: string[];
  priority: "high" | "medium" | "low";
}
