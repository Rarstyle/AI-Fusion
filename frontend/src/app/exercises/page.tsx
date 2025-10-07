"use client";

import Link from "next/link";
import { getAllExercises } from "@/lib/exercises";

export default function ExercisesPage() {
  const exercises = getAllExercises();

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      data-oid="8l8_kup"
    >
      {/* Header */}
      <div
        className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10"
        data-oid="l4wzo6q"
      >
        <div className="max-w-6xl mx-auto px-4 py-6" data-oid="hpo3:75">
          <div className="flex items-center justify-between" data-oid="j3ypxfy">
            <Link
              href="/"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              data-oid="qtpcpq8"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="_:_8e-:"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                  data-oid="w0zclll"
                />
              </svg>
              Back
            </Link>
            <h1 className="text-2xl font-bold text-white" data-oid="o248hwt">
              Select Exercise
            </h1>
            <div className="w-16" data-oid="j2e_nlw"></div>
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="max-w-6xl mx-auto px-4 py-12" data-oid="69d8ro2">
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          data-oid="b-2-3k7"
        >
          {exercises.map((exercise) => (
            <Link
              key={exercise.id}
              href={`/workout/${exercise.id}`}
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-blue-500/50 hover:bg-slate-800/70 transition-all duration-200 hover:scale-105"
              data-oid="rt7_atz"
            >
              {/* Exercise Icon */}
              <div className="text-6xl mb-4" data-oid="91fr9c2">
                {exercise.icon}
              </div>

              {/* Exercise Name */}
              <h2
                className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors"
                data-oid="jl.1wmj"
              >
                {exercise.name}
              </h2>

              {/* Description */}
              <p
                className="text-gray-400 text-sm mb-4 line-clamp-2"
                data-oid="s:2qe4q"
              >
                {exercise.description}
              </p>

              {/* Camera Angle Badge */}
              <div
                className="inline-flex items-center gap-2 mb-4"
                data-oid="8j8z2b8"
              >
                <span
                  className="px-3 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full"
                  data-oid="xak_ekf"
                >
                  📹 {exercise.cameraAngle} view
                </span>
              </div>

              {/* Target Muscles */}
              <div className="mb-4" data-oid="ngh9pfs">
                <p
                  className="text-xs text-gray-500 uppercase tracking-wider mb-2"
                  data-oid="csmryw5"
                >
                  Target Muscles
                </p>
                <div className="flex flex-wrap gap-2" data-oid="i00pcq1">
                  {exercise.targetMuscles.slice(0, 3).map((muscle) => (
                    <span
                      key={muscle}
                      className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded"
                      data-oid="z87.80i"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>

              {/* Common Errors Preview */}
              <div data-oid="zpouqjw">
                <p
                  className="text-xs text-gray-500 uppercase tracking-wider mb-2"
                  data-oid="obzoukb"
                >
                  We Check For
                </p>
                <ul
                  className="text-xs text-gray-400 space-y-1"
                  data-oid="3g58t9c"
                >
                  {exercise.commonErrors.slice(0, 2).map((error) => (
                    <li
                      key={error}
                      className="flex items-start gap-2"
                      data-oid="9jgjllx"
                    >
                      <span className="text-red-400 mt-0.5" data-oid="5_uksom">
                        •
                      </span>
                      <span data-oid="0qz5mtr">{error}</span>
                    </li>
                  ))}
                  {exercise.commonErrors.length > 2 && (
                    <li className="text-gray-500 italic" data-oid="7j9hqbb">
                      +{exercise.commonErrors.length - 2} more
                    </li>
                  )}
                </ul>
              </div>

              {/* Start Button */}
              <div
                className="mt-6 pt-4 border-t border-slate-700/50"
                data-oid="5-tri:4"
              >
                <div
                  className="flex items-center justify-between text-blue-400 font-semibold group-hover:text-blue-300"
                  data-oid="rpon9cw"
                >
                  <span data-oid="u9ysx8m">Start Exercise</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    data-oid="oiiu7hm"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                      data-oid="alehn6x"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Card */}
        <div
          className="mt-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6"
          data-oid="0r0a2hc"
        >
          <div className="flex items-start gap-4" data-oid="8jjlm:6">
            <div
              className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0"
              data-oid="unm8-xq"
            >
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="vka-6d:"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  data-oid="1mw:dm4"
                />
              </svg>
            </div>
            <div data-oid="dul64rb">
              <h3
                className="text-lg font-semibold text-white mb-2"
                data-oid=":.udois"
              >
                Setup Tips
              </h3>
              <ul
                className="text-gray-400 text-sm space-y-1"
                data-oid="dhs1dv8"
              >
                <li data-oid=":a9e6i_">
                  • Position your phone 6-8 feet away at hip height
                </li>
                <li data-oid="z8c7c4e">
                  • Ensure your entire body is visible in the frame
                </li>
                <li data-oid="4h:_0f3">
                  • Good lighting helps the AI track your movements
                </li>
                <li data-oid="tmn3g6s">
                  • Allow camera permissions when prompted
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
