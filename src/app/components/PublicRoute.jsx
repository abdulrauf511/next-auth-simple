"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../store/AuthContext";

export default function PublicRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/home");
    }
  }, [isLoading, isAuthenticated, router]);

  // While auth state is resolving, render nothing (or loader if you want)
  if (isLoading) return null;

  return children;
}
