"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import WorkoutCamera from "@/components/WorkoutCamera";
import { getExercise } from "@/lib/exercises";
import { ExerciseType, FormFeedback, RepData } from "@/types/exercise";

export default function WorkoutPage() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.exerciseId as ExerciseType;
  const exercise = getExercise(exerciseId);

  const [showInstructions, setShowInstructions] = useState(true);

  const handleComplete = (reps: RepData[], feedback: FormFeedback[]) => {
    // Store session data in sessionStorage
    const sessionData = {
      exerciseId,
      reps,
      feedback,
      endTime: Date.now(),
    };
    sessionStorage.setItem("workoutSession", JSON.stringify(sessionData));
    router.push("/summary");
  };

  if (showInstructions) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4"
        data-oid="yu_d852"
      >
        <div
          className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
          data-oid="w7xk6jv"
        >
          {/* Exercise Info */}
          <div className="text-center mb-8" data-oid="rwd0uex">
            <div className="text-6xl mb-4" data-oid="9qd7y5y">
              {exercise.icon}
            </div>
            <h1
              className="text-3xl font-bold text-white mb-2"
              data-oid="o6cfqzt"
            >
              {exercise.name}
            </h1>
            <p className="text-gray-400" data-oid="80m1lwd">
              {exercise.description}
            </p>
          </div>

          {/* Setup Instructions */}
          <div className="space-y-6 mb-8" data-oid="tgj8dg4">
            <div data-oid="krc5vi9">
              <h2
                className="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                data-oid="jzkh02q"
              >
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="j48-fet"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    data-oid="1d4ci-x"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    data-oid="k4yifzo"
                  />
                </svg>
                Camera Setup
              </h2>
              <div
                className="bg-slate-900/50 rounded-lg p-4 space-y-2"
                data-oid="qk8y4.8"
              >
                <p
                  className="text-gray-300 flex items-start gap-2"
                  data-oid="frj-4lg"
                >
                  <span
                    className="text-blue-400 font-semibold"
                    data-oid="fg.eej4"
                  >
                    •
                  </span>
                  <span data-oid="gfryse2">
                    Position phone{" "}
                    <strong className="text-white" data-oid="3bzq-6n">
                      6-8 feet away
                    </strong>{" "}
                    at hip height
                  </span>
                </p>
                <p
                  className="text-gray-300 flex items-start gap-2"
                  data-oid="g-533hd"
                >
                  <span
                    className="text-blue-400 font-semibold"
                    data-oid="462ichl"
                  >
                    •
                  </span>
                  <span data-oid="2n2w2wc">
                    Use{" "}
                    <strong className="text-white" data-oid="2eojdxf">
                      {exercise.cameraAngle} view
                    </strong>{" "}
                    - your entire body should be visible
                  </span>
                </p>
                <p
                  className="text-gray-300 flex items-start gap-2"
                  data-oid="m:rb207"
                >
                  <span
                    className="text-blue-400 font-semibold"
                    data-oid="s-gz0xx"
                  >
                    •
                  </span>
                  <span data-oid="g:-ddwe">
                    Ensure good lighting and a clear background
                  </span>
                </p>
                <p
                  className="text-gray-300 flex items-start gap-2"
                  data-oid=":20r.yd"
                >
                  <span
                    className="text-blue-400 font-semibold"
                    data-oid="bpnhmnu"
                  >
                    •
                  </span>
                  <span data-oid="sw2mc_l">
                    Grant camera permissions when prompted
                  </span>
                </p>
              </div>
            </div>

            {/* Common Errors */}
            <div data-oid="65nq_1j">
              <h2
                className="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                data-oid=":-gaxew"
              >
                <svg
                  className="w-6 h-6 text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  data-oid="i5wpzaw"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    data-oid="xue75f6"
                  />
                </svg>
                We'll Check For
              </h2>
              <div
                className="bg-slate-900/50 rounded-lg p-4"
                data-oid="gkh3w8y"
              >
                <ul className="space-y-2" data-oid="rgmau6e">
                  {exercise.commonErrors.map((error, index) => (
                    <li
                      key={index}
                      className="text-gray-300 flex items-start gap-2"
                      data-oid="r0g0xui"
                    >
                      <span
                        className="text-yellow-400 font-semibold"
                        data-oid="o3ya57m"
                      >
                        •
                      </span>
                      <span data-oid="f_zkh_b">{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="flex gap-4" data-oid="nelov-0">
            <button
              onClick={() => router.back()}
              className="flex-1 px-6 py-4 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
              data-oid="1ehr:sq"
            >
              Back
            </button>
            <button
              onClick={() => setShowInstructions(false)}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
              data-oid="ffsy-hn"
            >
              Start Workout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WorkoutCamera
      exerciseId={exerciseId}
      onComplete={handleComplete}
      data-oid="n6ng_tq"
    />
  );
}
