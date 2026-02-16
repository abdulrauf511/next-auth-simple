import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return Response.json({ user: null }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

  if (!payload) {
    return Response.json({ user: null }, { status: 401 });
  }

  return Response.json({ user: payload });
}
