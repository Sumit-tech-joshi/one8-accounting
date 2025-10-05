import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { verifyPassword, makeToken } from "../../../../lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("email", email)
    .limit(1)
    .single();

  if (error || !data) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const ok = verifyPassword(password, data.password_hash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = makeToken({ sub: data.id, role: data.role });
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "one8_session",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
  return res;
}