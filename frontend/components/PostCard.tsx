// components/PostCard.tsx
import Link from "next/link";

type Post = { id: string; title: string; slug: string; excerpt?: string };

export default function PostCard({ post }: { post: Post }) {
  return (
    <article className="border rounded p-4">
      <h3 className="text-xl font-semibold">
        <Link href={`/resources/${post.slug}`}>{post.title}</Link>
      </h3>
      {post.excerpt && <p className="text-sm text-gray-600 mt-2">{post.excerpt}</p>}
    </article>
  );
}
