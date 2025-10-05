import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string | null;
  published_at?: string | null;
};

export async function GET() {
  const site = process.env.SITE_URL ?? "http://localhost:3000";
  const res = await supabaseAdmin
    .from("posts")
    .select("id, slug, title, excerpt, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(20);

  if (res.error) {
    const errorRss = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Resources (error)</title><link>${site}</link><description>Error generating feed</description></channel></rss>`;
    return new NextResponse(errorRss, { headers: { "Content-Type": "application/rss+xml" } });
  }

  const posts = (res.data ?? []) as Post[];

  let rss = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel>`;
  rss += `<title>Resources</title><link>${site}</link><description>Latest posts</description>`;

  for (const p of posts) {
    const pubDate = p.published_at ? new Date(p.published_at).toUTCString() : new Date().toUTCString();
    const title = p.title ?? "Untitled";
    const excerpt = p.excerpt ?? "";
    const url = `${site.replace(/\/$/, "")}/resources/${p.slug}`;
    rss += `<item><title><![CDATA[${title}]]></title><link>${url}</link><pubDate>${pubDate}</pubDate><description><![CDATA[${excerpt}]]></description></item>`;
  }

  rss += `</channel></rss>`;

  return new NextResponse(rss, { headers: { "Content-Type": "application/rss+xml" } });
}