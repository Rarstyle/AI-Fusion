"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-colors duration-200 flex-col p-4 relative"
      data-oid="in61k2."
    >
      {/* Top Right Login/Signup Button */}
      <div className="absolute top-6 right-8 z-10">
        <Link href="/login">
          <button className="px-5 py-2 bg-white text-blue-600 font-semibold rounded-full shadow hover:bg-blue-50 border border-blue-200 transition">Login / Sign Up</button>
        </Link>
      </div>
      {/* Hero Section */}
      <div
        className="max-w-5xl mx-auto text-center space-y-8 py-16"
        data-oid="e3pjajf"
      >
        {/* Logo/Brand */}
        <div className="inline-block mb-4" data-oid=":j2:0nz">
          <div
            className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
            data-oid="18cq28d"
          >
            <svg
              viewBox="0 0 24 24"
              data-oid="sibh5n7"
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
                data-oid="h3fei_m"
              />
            </svg>
          </div>
        </div>

        <h1
          className="text-6xl font-bold mb-6 tracking-tight text-white"
          data-oid="snei1:i"
        >
          AI{" "}
          <span
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            data-oid="sfemymd"
          >
            Fusion
          </span>
        </h1>

        <p
          className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          data-oid="390bmag"
        >
          Turn your phone into a real-time technique coach
        </p>

        <p
          className="text-lg text-gray-400 max-w-2xl mx-auto"
          data-oid="li--4_j"
        >
          Get instant feedback on your form, accurate rep counting, and
          personalized corrective plans—all processed on your device for
          complete privacy.
        </p>

        {/* CTA Button */}
        <div className="pt-8" data-oid="8q:5sxy">
          <Link
            href="/exercises"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
            data-oid="jbrdela"
          >
            Start Training
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              data-oid="n1o_oqp"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
                data-oid="v7plfzq"
              />
            </svg>
          </Link>
        </div>

        {/* Features Grid */}
        <div
          className="grid md:grid-cols-3 gap-8 pt-16 text-left"
          data-oid="d0s13c-"
        >
          <div
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-200"
            data-oid="ifd-n-9"
          >
            <div
              className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4"
              data-oid="bu9kj2l"
            >
              <svg
                className="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="kza7-82"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  data-oid="_o9oue6"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  data-oid="z03grrt"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold text-white mb-2"
              data-oid="ktwdgc9"
            >
              Real-Time Feedback
            </h3>
            <p className="text-gray-400" data-oid="2ro..rw">
              Instant cues like "knees caving" or "back rounding" as you perform
              each rep.
            </p>
          </div>

          <div
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all duration-200"
            data-oid="py0p8v9"
          >
            <div
              className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4"
              data-oid="m0ov:9p"
            >
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="9-g97jr"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  data-oid="_qop_oy"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold text-white mb-2"
              data-oid="4xiygad"
            >
              Smart Rep Counting
            </h3>
            <p className="text-gray-400" data-oid="di:e7-j">
              Only clean reps count. Bad form? We'll let you know and skip the
              count.
            </p>
          </div>

          <div
            className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 hover:border-green-500/50 transition-all duration-200"
            data-oid="psyu..g"
          >
            <div
              className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4"
              data-oid="sl9z4m5"
            >
              <svg
                className="w-6 h-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                data-oid="rs:owz5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  data-oid="6-7d3w4"
                />
              </svg>
            </div>
            <h3
              className="text-xl font-semibold text-white mb-2"
              data-oid="iu.8dhs"
            >
              Privacy First
            </h3>
            <p className="text-gray-400" data-oid="l6vywi.">
              All processing happens on your device. No video uploads, no cloud
              storage.
            </p>
          </div>
        </div>

        {/* Supported Exercises */}
        <div className="pt-16" data-oid="iu3:cwn">
          <h2
            className="text-2xl font-semibold text-white mb-6"
            data-oid="5w929.r"
          >
            Core Exercises Covered
          </h2>
          <div
            className="flex flex-wrap justify-center gap-3"
            data-oid="hvrm1lb"
          >
            {["Squat", "Deadlift", "Push-Up", "Row", "Overhead Press"].map(
              (exercise) => (
                <span
                  key={exercise}
                  className="px-4 py-2 bg-slate-800/70 border border-slate-700 text-gray-300 rounded-full text-sm"
                  data-oid="v3_ceq-"
                >
                  {exercise}
                </span>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="max-w-5xl mx-auto text-center py-8 text-gray-500 text-sm"
        data-oid="7ovk48n"
      >
        <p data-oid="33_yd.f">
          Phone-only • No hardware required • Designed for home lifters, PT
          clients, and coaches
        </p>
      </div>
    </div>
  );
}
