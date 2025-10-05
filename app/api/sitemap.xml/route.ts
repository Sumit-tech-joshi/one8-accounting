import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";


export async function GET() {
  const site = process.env.SITE_URL ?? "http://localhost:3000";
  const postsRes = await supabaseAdmin.from("posts").select("slug").eq("published", true);
  const posts = postsRes.error ? [] : postsRes.data ?? [];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  xml += `<url><loc>${site}</loc></url>\n`;
  for (const p of posts) {
    if (p?.slug) xml += `<url><loc>${site}/resources/${p.slug}</loc></url>\n`;
  }
  xml += `</urlset>`;
  return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
}