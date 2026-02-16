import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/users";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email & password required" },
      { status: 400 },
    );
  }

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now().toString(), email, password: hashed };
  users.push(newUser);

  const token = signToken({ id: newUser.id, email: newUser.email });

  return Response.json({
    message: "Signup success",
  });
}
