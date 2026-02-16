"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthGuard from "./utils/AuthGuard";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // 👇 define protected routes here
  const protectedRoutes = ["/", "/welcome"];

  const isProtected = protectedRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isProtected ? <AuthGuard>{children}</AuthGuard> : children}
      </body>
    </html>
  );
}
