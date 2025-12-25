// components/ContactCta.tsx
"use client";
import { useRouter } from "next/navigation";

export default function ContactCta() {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push("/contact")}
        className="inline-block bg-slate-900 text-white px-5 py-3 rounded shadow hover:bg-slate-800"
      >
        Request a Quote
      </button>
    </div>
  );
}