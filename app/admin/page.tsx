// app/admin/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  title: string;
  slug?: string;
};

export default function Admin() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((r) => r.json())
      .then((j) => {
        if (Array.isArray(j.posts)) setPosts(j.posts as Post[]);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Admin Dashboard</h2>
      <div className="mb-4">
        <Link href="/admin/posts/new" className="px-3 py-2 bg-green-600 text-white rounded">
          New Post
        </Link>
      </div>
      <div className="grid gap-4">
        {posts.map((p) => (
          <div key={p.id} className="border p-3">
            <strong>{p.title}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
