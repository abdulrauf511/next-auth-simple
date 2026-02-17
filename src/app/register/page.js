"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PublicRoute from "../components/PublicRoute";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";
import { useAuth } from "../store/AuthContext";
import { validateEmail, validatePassword } from "../utils/validators";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    if (!validateEmail(email)) return setErr("Enter a valid email");
    if (!validatePassword(password))
      return setErr("Password must be at least 6 characters");

    try {
      await register({ email, password });
      setOk("Account created. Please login.");
      router.replace("/login");
    } catch (e) {
      setErr(e.message || "Register failed");
    }
  }

  return (
    <PublicRoute>
      <div className="min-h-screen grid place-items-center px-4">
        <Card className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold">Create account</h1>
          <p className="mt-1 text-sm text-white/60">Register then login.</p>

          {err && (
            <div className="mt-4">
              <Alert>{err}</Alert>
            </div>
          )}
          {ok && (
            <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300">
              {ok}
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-5 space-y-3">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="w-full" disabled={isLoading}>
              {isLoading ? "Creating..." : "Register"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-white/60">
            Already have an account?{" "}
            <a className="underline" href="/login">
              Login
            </a>
          </p>
        </Card>
      </div>
    </PublicRoute>
  );
}
