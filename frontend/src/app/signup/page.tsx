import React from "react";

export default function SignupPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-colors duration-200 p-4">
      <form className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-96 flex flex-col items-center">
        <a href="/" className="self-start mb-4 text-green-300 hover:text-green-400 transition font-semibold text-sm px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow hover:bg-white/20">← Back</a>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-white drop-shadow">Sign Up</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 p-3 rounded-xl bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" required />
        <input type="password" placeholder="Password" className="w-full mb-4 p-3 rounded-xl bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" required />
        <input type="password" placeholder="Confirm Password" className="w-full mb-6 p-3 rounded-xl bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400" required />
        <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-purple-600 transition-all duration-200 mb-2">Sign Up</button>
        <div className="mt-2 text-center text-sm text-white/80">
          Already have an account? <a href="/login" className="text-green-300 hover:underline">Login</a>
        </div>
      </form>
    </div>
  );
}
