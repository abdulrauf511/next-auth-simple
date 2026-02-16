import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/users";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = users.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ id: user.id, email: user.email });

  return Response.json({
    message: "Login success",
    token,
  });
}
