import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { verifyToken } from "../../../lib/auth";
import { cookies } from "next/headers";


type JwtPayload = {
  sub?: string;
  role?: string;
};

export async function GET() {
  const res = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (res.error) return NextResponse.json({ error: res.error }, { status: 500 });
  return NextResponse.json({ posts: res.data ?? [] });
}

export async function POST(req: Request) {
  // ✅ cookies() is synchronous in App Router
  
  const cookieStore = await cookies()
  const token = cookieStore.get("one8_session")?.value ?? null;

  const verified = verifyToken(token || "");
  const payload: JwtPayload | null =
    verified && typeof verified === "object" ? (verified as JwtPayload) : null;

  if (!payload || !payload.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slug =
    body.slug ??
    (body.title || "").toLowerCase().replace(/\s+/g, "-").slice(0, 200);

  const insert = await supabaseAdmin
    .from("posts")
    .insert([
      {
        slug,
        title: body.title,
        excerpt: body.excerpt,
        content: body.content,
        featured_image: body.featuredImage,
        categories: body.categories ?? [],
        tags: body.tags ?? [],
        published: body.published ?? false,
        published_at: body.published ? new Date().toISOString() : null,
        author: payload.sub ?? null,
        seo_title: body.seoTitle,
        seo_description: body.seoDescription,
        canonical_url: body.canonicalUrl,
      },
    ])
    .select();

  if (insert.error) {
    return NextResponse.json({ error: insert.error }, { status: 500 });
  }

  return NextResponse.json({ post: insert.data?.[0] ?? null });
}