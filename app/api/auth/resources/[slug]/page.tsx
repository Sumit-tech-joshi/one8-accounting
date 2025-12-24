import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import Seo from "../../../components/Seo";


type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  seo_title?: string | null;
  seo_description?: string | null;
  featured_image?: string | null;
  published_at?: string | null;
};

export async function generateStaticParams() {
  const res = await supabaseAdmin.from("posts").select("slug").eq("published", true);
  const rows = (res.data ?? []) as Array<{ slug?: string }>;
  return rows.filter((r): r is { slug: string } => typeof r.slug === "string").map((p) => ({ slug: p.slug }));
}

export const revalidate = 60;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const res = await supabaseAdmin
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .limit(1)
    .single();

  const data = res.data as Post | null;
  const error = res.error;

  if (error) {
    console.error("Error fetching post by slug:", error);
    return <div className="max-w-4xl mx-auto p-6">Post not found</div>;
  }

  const post = data ?? null;

  if (!post) {
    return <div className="max-w-4xl mx-auto p-6">Post not found</div>;
  }

  return (
    <>
      <Seo
        title={post.seo_title ?? post.title}
        description={post.seo_description ?? post.excerpt ?? undefined}
      />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl mb-4">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
    </>
  );
}