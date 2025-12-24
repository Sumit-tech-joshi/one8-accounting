import PostCard from "../../components/PostCard";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export default async function Resources() {
  const res = await supabaseAdmin.from("posts").select("*").eq("published", true).order("published_at", { ascending: false });
  const posts = res.data ?? [];
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl mb-6">Resources</h1>
      <div className="grid gap-4">
        {posts.map((post: { id: string; title: string; slug: string; excerpt?: string }) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
