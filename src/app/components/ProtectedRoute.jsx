"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../store/AuthContext";
import { getToken } from "../utils/storage";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();

  // On mount and on route changes, verify token still exists in localStorage.
  // If user manually removed the token (devtools), force logout and redirect.
  useEffect(() => {
    if (isLoading) return;

    const token = getToken();
    if (!token) {
      // ensure auth state is cleared
      try {
        logout();
      } catch (e) {
        console.error("Error during logout:", e);
      }
      router.push(`/login?next=${encodeURIComponent(pathname || "/")}`);
      return;
    }

    if (!isAuthenticated) {
      router.push(`/login?next=${encodeURIComponent(pathname || "/")}`);
    }
  }, [isLoading, isAuthenticated, logout, router, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
