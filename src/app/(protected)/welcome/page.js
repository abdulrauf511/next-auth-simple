"use client";

import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAuth } from "../../store/AuthContext";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <Card>
      <h1 className="text-2xl font-semibold">Welcome 🎉</h1>
      <p className="mt-2 text-white/70">You are authenticated.</p>

      <div className="mt-6 flex gap-3">
        <Button variant="secondary" onClick={() => router.push("/home")}>
          Go Home
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            logout();
            router.replace("/login");
          }}
        >
          Logout
        </Button>
      </div>
    </Card>
  );
}
