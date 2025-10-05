"use client";
import { useState } from "react";
import RichTextEditor from "../../../../components/RichTextEditor";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, published: false })
    });
    const json = await res.json();
    setLoading(false);
    if (res.ok) router.push("/admin");
    else alert("Error: " + JSON.stringify(json));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl mb-4">New Post</h2>
      <form onSubmit={handleSave} className="space-y-4">
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border" />
        <input value={excerpt} onChange={e=>setExcerpt(e.target.value)} placeholder="Excerpt" className="w-full p-2 border" />
        <RichTextEditor content={content} onChange={setContent} />
        <div>
          <button type="submit" disabled={loading} className="px-3 py-2 bg-blue-600 text-white">{loading ? "Saving..." : "Save Draft"}</button>
        </div>
      </form>
    </div>
  );
}