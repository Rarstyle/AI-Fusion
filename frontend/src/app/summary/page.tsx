"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getExercise } from "@/lib/exercises";
import {
  ExerciseType,
  FormFeedback,
  RepData,
  CorrectivePlan,
} from "@/types/exercise";

interface SessionData {
  exerciseId: ExerciseType;
  reps: RepData[];
  feedback: FormFeedback[];
  endTime: number;
}

export default function SummaryPage() {
  const router = useRouter();
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [correctivePlan, setCorrectivePlan] = useState<CorrectivePlan[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem("workoutSession");
    if (!data) {
      router.push("/exercises");
      return;
    }

    const session: SessionData = JSON.parse(data);
    setSessionData(session);

    // Generate corrective plan based on feedback
    const plan = generateCorrectivePlan(session.feedback);
    setCorrectivePlan(plan);
  }, [router]);

  const generateCorrectivePlan = (
    feedback: FormFeedback[],
  ): CorrectivePlan[] => {
    const issues = new Map<string, number>();

    feedback.forEach((fb) => {
      if (fb.severity === "warning" || fb.severity === "error") {
        issues.set(fb.type, (issues.get(fb.type) || 0) + 1);
      }
    });

    const plans: CorrectivePlan[] = [];

    // Map issues to corrective exercises
    const correctiveMapping: Record<string, CorrectivePlan> = {
      knee_valgus: {
        issue: "Knees Caving Inward",
        description:
          "Weak hip abductors and external rotators causing knee valgus.",
        exercises: [
          "Banded lateral walks (3x15)",
          "Clamshells (3x20 each side)",
          "Single-leg glute bridges (3x12 each)",
        ],

        priority: "high",
      },
      forward_lean: {
        issue: "Excessive Forward Lean",
        description:
          "Weak quads or limited ankle mobility causing forward trunk lean.",
        exercises: [
          "Goblet squats (3x12)",
          "Ankle mobility drills (2 min)",
          "Wall sits (3x30 seconds)",
        ],

        priority: "medium",
      },
      depth: {
        issue: "Insufficient Depth",
        description:
          "Limited mobility or weak stabilizers preventing full range of motion.",
        exercises: [
          "Box squats (3x10)",
          "Hip flexor stretches (2 min each side)",
          "Deep bodyweight squats (3x5, hold bottom)",
        ],

        priority: "medium",
      },
      back_rounding: {
        issue: "Back Rounding",
        description:
          "Weak core and back extensors compromising spinal position.",
        exercises: [
          "Romanian deadlifts (3x10)",
          "Bird dogs (3x10 each side)",
          "Dead bugs (3x12)",
        ],

        priority: "high",
      },
      hip_sag: {
        issue: "Hips Sagging",
        description: "Weak core stability affecting plank position.",
        exercises: [
          "Plank holds (3x30-60 seconds)",
          "Hollow body holds (3x20 seconds)",
          "Dead bugs (3x12)",
        ],

        priority: "high",
      },
    };

    // Sort by frequency and add to plan
    const sortedIssues = Array.from(issues.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    sortedIssues.forEach(([type]) => {
      if (correctiveMapping[type]) {
        plans.push(correctiveMapping[type]);
      }
    });

    return plans;
  };

  if (!sessionData) {
    return (
      <div
        className="min-h-screen bg-slate-900 flex items-center justify-center"
        data-oid="aak.:4a"
      >
        <div className="text-white" data-oid="ufr30ff">
          Loading...
        </div>
      </div>
    );
  }

  const exercise = getExercise(sessionData.exerciseId);
  const validReps = sessionData.reps.filter((r) => r.valid).length;
  const totalAttempts = sessionData.reps.length;
  const accuracy =
    totalAttempts > 0 ? ((validReps / totalAttempts) * 100).toFixed(0) : "0";

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4"
      data-oid="f8697g9"
    >
      <div className="max-w-4xl mx-auto" data-oid="zsbcvr0">
        {/* Header */}
        <div className="text-center mb-8" data-oid="i:0uob8">
          <div className="text-6xl mb-4" data-oid="1sps7jr">
            {exercise.icon}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2" data-oid="p-31mmr">
            Session Complete!
          </h1>
          <p className="text-gray-400" data-oid="5ke2qsb">
            {exercise.name}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-8" data-oid="0h4ib6d">
          <div
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center"
            data-oid="1d:c:j7"
          >
            <div
              className="text-5xl font-bold text-green-400 mb-2"
              data-oid=".6es6c0"
            >
              {validReps}
            </div>
            <p className="text-gray-400" data-oid="oa-z_5a">
              Clean Reps
            </p>
          </div>
          <div
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center"
            data-oid=":gf__2y"
          >
            <div
              className="text-5xl font-bold text-blue-400 mb-2"
              data-oid="n:k.shg"
            >
              {accuracy}%
            </div>
            <p className="text-gray-400" data-oid="b:er7r:">
              Form Accuracy
            </p>
          </div>
          <div
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 text-center"
            data-oid="lyu-jyd"
          >
            <div
              className="text-5xl font-bold text-purple-400 mb-2"
              data-oid="bas1-hm"
            >
              {sessionData.feedback.length}
            </div>
            <p className="text-gray-400" data-oid="ec0vaye">
              Form Cues
            </p>
          </div>
        </div>

        {/* Corrective Plan */}
        {correctivePlan.length > 0 && (
          <div
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8"
            data-oid="mdu8tzc"
          >
            <h2
              className="text-2xl font-bold text-white mb-4 flex items-center gap-2"
              data-oid="tmbzhbv"
            >
              <svg
                className="w-7 h-7 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="00u4g9f"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  data-oid="v2u1kdr"
                />
              </svg>
              Your Corrective Plan
            </h2>
            <p className="text-gray-400 mb-6" data-oid="fgp90eg">
              Based on your form analysis, here are targeted exercises to
              improve your technique:
            </p>

            <div className="space-y-6" data-oid="ex4pidt">
              {correctivePlan.map((plan, index) => (
                <div
                  key={index}
                  className="bg-slate-900/50 rounded-lg p-5"
                  data-oid="jxo7ze-"
                >
                  <div
                    className="flex items-start justify-between mb-3"
                    data-oid="kk9ya:b"
                  >
                    <div data-oid="kboh0jz">
                      <h3
                        className="text-lg font-semibold text-white mb-1"
                        data-oid="qm30avi"
                      >
                        {plan.issue}
                      </h3>
                      <p className="text-sm text-gray-400" data-oid="uf:49n:">
                        {plan.description}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        plan.priority === "high"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                      data-oid="639iwln"
                    >
                      {plan.priority === "high"
                        ? "High Priority"
                        : "Medium Priority"}
                    </span>
                  </div>
                  <div data-oid="w.9ekg5">
                    <p
                      className="text-sm text-gray-500 uppercase tracking-wider mb-2"
                      data-oid="42vyu5i"
                    >
                      Corrective Exercises
                    </p>
                    <ul className="space-y-2" data-oid="6mlwxk2">
                      {plan.exercises.map((ex, i) => (
                        <li
                          key={i}
                          className="text-gray-300 flex items-start gap-2"
                          data-oid="pqr10n-"
                        >
                          <span
                            className="text-green-400 font-semibold"
                            data-oid="x4t1qho"
                          >
                            ✓
                          </span>
                          <span data-oid="w5onplk">{ex}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback History */}
        <div
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8"
          data-oid="k_gitgk"
        >
          <h2
            className="text-2xl font-bold text-white mb-4 flex items-center gap-2"
            data-oid="opdf205"
          >
            <svg
              className="w-7 h-7 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="nu91.5w"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                data-oid=".by1ame"
              />
            </svg>
            Session Feedback
          </h2>

          <div
            className="max-h-64 overflow-y-auto space-y-2"
            data-oid="fj4vt0p"
          >
            {sessionData.feedback.length === 0 ? (
              <p className="text-gray-400 text-center py-4" data-oid="f1_r:9l">
                Perfect form! No corrections needed.
              </p>
            ) : (
              sessionData.feedback.slice(0, 20).map((fb, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg flex items-start gap-3 ${
                    fb.severity === "error"
                      ? "bg-red-500/10 border-l-4 border-red-500"
                      : fb.severity === "warning"
                        ? "bg-yellow-500/10 border-l-4 border-yellow-500"
                        : "bg-green-500/10 border-l-4 border-green-500"
                  }`}
                  data-oid="jqj2ivd"
                >
                  <span className="text-xl" data-oid="k6g7-oh">
                    {fb.severity === "error"
                      ? "❌"
                      : fb.severity === "warning"
                        ? "⚠️"
                        : "✓"}
                  </span>
                  <div className="flex-1" data-oid="-6s0_i_">
                    <p className="text-gray-200" data-oid="nesv0.c">
                      {fb.message}
                    </p>
                    <p
                      className="text-xs text-gray-500 mt-1"
                      data-oid="hcbcqrz"
                    >
                      {new Date(fb.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4" data-oid=":udnufl">
          <Link
            href="/exercises"
            className="flex-1 px-6 py-4 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors text-center"
            data-oid="61dhe86"
          >
            Try Another Exercise
          </Link>
          <button
            onClick={() => router.push(`/workout/${sessionData.exerciseId}`)}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
            data-oid="esh82l0"
          >
            Do It Again
          </button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center" data-oid="u5mp9jy">
          <p className="text-gray-500 text-sm" data-oid="ld-:8c.">
            💡 Pro tip: Do your corrective exercises before your next{" "}
            {exercise.name} session
          </p>
        </div>
      </div>
    </div>
  );
}
