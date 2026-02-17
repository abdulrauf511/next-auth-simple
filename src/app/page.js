"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "./utils/storage";

export default function Page() {
  const router = useRouter();
  console.log("This is main page.js console log");
  

  useEffect(() => {
    const token = getToken();
    router.replace(token ? "/home" : "/login");
  }, [router]);

  return null;
}
