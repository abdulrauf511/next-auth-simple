"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setErr(data.error || "Login failed");
      return;
    }

    // 🔐 TOKEN STORED HERE
    localStorage.setItem("auth_token", data.token);

    router.push("/welcome");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow rounded-xl p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Login</h1>

        {err && <p className="text-sm text-red-600">{err}</p>}

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white rounded-lg p-2">
          Login
        </button>

        <p className="text-sm">
          New here?{" "}
          <a className="underline" href="/signup">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}
