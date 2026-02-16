"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

function StatCard({ label, value, hint }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-sm text-white/70">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      {hint ? <p className="mt-2 text-xs text-white/50">{hint}</p> : null}
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <p className="text-base font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{desc}</p>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, []);

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        localStorage.removeItem("auth_token");
        router.push("/login");
        return;
      }

      const data = await res.json();
      setUser(data.user);

      // ✅ IMPORTANT
      setLoading(false);
    }

    loadUser();
  }, [router]);

  function logout() {
    localStorage.removeItem("auth_token");
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* subtle background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/3 top-0 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Protected Area</p>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
          </div>

          <button
            onClick={logout}
            className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
          >
            Logout
          </button>
        </header>

        {/* Hero */}
        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <p className="text-sm text-white/60">{today}</p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            {loading ? (
              "Loading..."
            ) : (
              <>
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  {user?.email}
                </span>
              </>
            )}
          </h2>

          <p className="mt-4 max-w-xl text-sm text-white/70">
            This dashboard is accessible only after authentication. Your session
            is verified using a JWT stored in localStorage and validated via the{" "}
            <span className="text-white/85">/api/auth/me</span> endpoint.
          </p>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => router.push("/welcome")}
              className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
            >
              Open Welcome Page
            </button>

            <button
              onClick={() => router.push("/profile")}
              className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Profile (next)
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Auth Status"
            value={loading ? "Checking…" : "Authenticated"}
          />
          <StatCard
            label="Token Storage"
            value="localStorage"
            hint="Client-side storage"
          />
          <StatCard label="Session Type" value="JWT" hint="Access token" />
          <StatCard
            label="User Store"
            value="In-memory"
            hint="Demo purpose only"
          />
        </section>

        {/* Features */}
        <section className="mt-10">
          <h3 className="mb-4 text-lg font-semibold">What’s implemented</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Feature
              title="JWT Authentication"
              desc="Users authenticate using JSON Web Tokens generated on login and stored on the client."
            />
            <Feature
              title="Protected Routes"
              desc="Routes are guarded on the client and verified via a secure /me endpoint."
            />
            <Feature
              title="Secure Passwords"
              desc="Passwords are hashed before storage. Plain-text passwords are never saved."
            />
            <Feature
              title="Clean Auth Flow"
              desc="Signup → Login → Token stored → Protected dashboard access."
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          Auth Demo • Next.js • TailwindCSS
        </footer>
      </div>
    </div>
  );
}
