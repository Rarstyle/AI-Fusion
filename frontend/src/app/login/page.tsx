"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { login, storeAuthToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = (formData.get("username") as string)?.trim();
    const password = (formData.get("password") as string) ?? "";

    if (!username || !password) {
      setError("Username and password are required.");
      setLoading(false);
      return;
    }

    try {
      const result = await login({ username, password });
      storeAuthToken(result.token);
      router.push("/exercises");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-colors duration-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-10 w-96 flex flex-col items-center"
      >
        <Link
          href="/"
          className="self-start mb-4 text-blue-300 hover:text-blue-400 transition font-semibold text-sm px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow hover:bg-white/20"
        >
          &lt; Back
        </Link>
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white drop-shadow">
          Login
        </h2>
        <p className="text-sm text-blue-100/80 mb-4 text-center">
          Demo users: admin/admin or user/user
        </p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full mb-4 p-3 rounded-xl bg-white/70 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-3 rounded-xl bg-white/70 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        {error && (
          <div className="w-full mb-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-100 px-3 py-2 text-sm text-center">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 mb-2 disabled:opacity-70"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        <div className="mt-2 text-center text-sm text-white/80">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-300 hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
