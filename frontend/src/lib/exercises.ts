import { Exercise, ExerciseType } from "@/types/exercise";

export const exercises: Record<ExerciseType, Exercise> = {
  squat: {
    id: "squat",
    name: "Squat",
    description:
      "Master the fundamental lower body movement pattern with proper depth and alignment.",
    cameraAngle: "side",
    icon: "🦵",
    targetMuscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"],
    commonErrors: [
      "Knees caving inward",
      "Excessive forward lean",
      "Insufficient depth",
      "Heels lifting off ground",
      "Lower back rounding",
    ],
  },
  deadlift: {
    id: "deadlift",
    name: "Deadlift / Hip Hinge",
    description:
      "Learn the hip hinge pattern essential for posterior chain development and injury prevention.",
    cameraAngle: "side",
    icon: "💪",
    targetMuscles: ["Hamstrings", "Glutes", "Lower Back", "Core"],
    commonErrors: [
      "Back rounding",
      "Hips rising too fast",
      "Bar drifting away from body",
      "Knees locking too early",
      "Improper breathing",
    ],
  },
  pushup: {
    id: "pushup",
    name: "Push-Up",
    description:
      "Perfect your upper body pressing mechanics and core stability.",
    cameraAngle: "side",
    icon: "💥",
    targetMuscles: ["Chest", "Triceps", "Shoulders", "Core"],
    commonErrors: [
      "Sagging hips",
      "Flaring elbows",
      "Incomplete range of motion",
      "Head dropping",
      "Pike position",
    ],
  },
  row: {
    id: "row",
    name: "Row",
    description:
      "Develop proper pulling mechanics and posterior shoulder strength.",
    cameraAngle: "front",
    icon: "🚣",
    targetMuscles: ["Upper Back", "Lats", "Rhomboids", "Biceps"],
    commonErrors: [
      "Excessive momentum",
      "Shoulder shrugging",
      "Elbow flaring",
      "Incomplete scapular retraction",
      "Torso rotation",
    ],
  },
  "overhead-press": {
    id: "overhead-press",
    name: "Overhead Press",
    description:
      "Build stable overhead pressing mechanics and shoulder health.",
    cameraAngle: "front",
    icon: "🏋️",
    targetMuscles: ["Shoulders", "Triceps", "Upper Chest", "Core"],
    commonErrors: [
      "Excessive lower back arch",
      "Bar path not straight",
      "Head not passing through",
      "Core instability",
      "Incomplete lockout",
    ],
  },
};

export const getExercise = (id: ExerciseType): Exercise => exercises[id];

export const getAllExercises = (): Exercise[] => Object.values(exercises);
