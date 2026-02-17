"use client";

import Button from "../../components/ui/Button";
import { useRouter } from "next/navigation";
import { useAuth } from "../../store/AuthContext";

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="font-semibold">Lens Frontend</div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-white/70">{user?.email || ""}</span>
          <Button variant="secondary" onClick={() => router.push("/welcome")}>
            Welcome
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
      </div>
    </div>
  );
}
