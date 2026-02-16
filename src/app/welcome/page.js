"use client";

import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("auth_token");
    router.replace("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl p-8 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-3xl">
          🎉
        </div>

        <h1 className="text-3xl font-bold text-white">Welcome!</h1>

        <p className="mt-3 text-sm text-white/70">
          You have successfully logged in. This page is protected and only
          accessible to authenticated users.
        </p>

        <div className="mt-8 space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-white/90 transition"
          >
            Go to Home
          </button>

          <button
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
