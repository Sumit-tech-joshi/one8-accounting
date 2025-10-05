"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

export default function RichTextEditor({ content, onChange }: { content?: string; onChange?: (html: string) => void; }) {
  const editor = useEditor({
    extensions: [StarterKit, Link, Image],
    content: content || "<p></p>",
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  // keep editor initial content sync
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <div>
      <div className="mb-2">
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()} className="mr-2">B</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleItalic().run()} className="mr-2">I</button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()} className="mr-2">•</button>
      </div>
      <div className="prose dark:prose-invert">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}