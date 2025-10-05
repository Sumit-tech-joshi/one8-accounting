// app/api/posts/[slug]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { verifyToken } from "../../../../lib/auth";

type Params = { slug: string };
type MaybePromiseParams = { params: Params } | { params: Promise<Params> };

async function resolveParams(ctx: MaybePromiseParams): Promise<Params> {
  const paramsMaybe = (ctx as unknown as { params: Params | Promise<Params> }).params;
  if (isPromise(paramsMaybe)) return await paramsMaybe;
  return paramsMaybe;
}
function isPromise(x: unknown): x is Promise<Params> {
  return typeof x === "object" && x !== null && "then" in (x as object) && typeof (x as { then: unknown }).then === "function";
}

type JwtPayload = {
  sub?: string;
  role?: string;
};

export async function GET(req: Request, ctx: MaybePromiseParams) {
  const { slug } = await resolveParams(ctx);

  const res = await supabaseAdmin.from("posts").select("*").eq("slug", slug).limit(1).single();
  if (res.error || !res.data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ post: res.data });
}

export async function PUT(req: Request, ctx: MaybePromiseParams) {
  const { slug } = await resolveParams(ctx);

  // Await cookies() to handle Next.js types that sometimes return a Promise
  const cookieStore = await cookies();
  const one8Cookie = cookieStore.get("one8_session")?.value ?? null;

  const verified = verifyToken(one8Cookie || "");
  const payload = (verified && typeof verified === "object" ? (verified as JwtPayload) : null);

  if (!payload || !payload.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bodyUnknown = (await req.json()) as unknown;

  // Determine published_at safely without using `any`
  let publishedAt: string | null = null;
  if (
    typeof bodyUnknown === "object" &&
    bodyUnknown !== null &&
    "published" in (bodyUnknown as object) &&
    Boolean((bodyUnknown as Record<string, unknown>).published)
  ) {
    publishedAt = new Date().toISOString();
  }

  // Build update payload by spreading only if bodyUnknown is object
  const updatePayload: Record<string, unknown> =
    typeof bodyUnknown === "object" && bodyUnknown !== null ? { ...(bodyUnknown as Record<string, unknown>) } : {};

  updatePayload.updated_at = new Date().toISOString();
  updatePayload.published_at = publishedAt;

  const upd = await supabaseAdmin
    .from("posts")
    .update(updatePayload)
    .eq("slug", slug)
    .select()
    .single();

  if (upd.error) return NextResponse.json({ error: upd.error }, { status: 500 });
  return NextResponse.json({ post: upd.data });
}

export async function DELETE(req: Request, ctx: MaybePromiseParams) {
  const { slug } = await resolveParams(ctx);

  const cookieStore = await cookies();
  const one8Cookie = cookieStore.get("one8_session")?.value ?? null;

  const verified = verifyToken(one8Cookie || "");
  const payload = (verified && typeof verified === "object" ? (verified as JwtPayload) : null);

  if (!payload || !payload.sub) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const del = await supabaseAdmin.from("posts").delete().eq("slug", slug);
  if (del.error) return NextResponse.json({ error: del.error }, { status: 500 });
  return NextResponse.json({ ok: true });
}