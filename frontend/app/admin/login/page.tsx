"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const json = await res.json();
    if (!res.ok) { setErr(json.error || "Login failed"); return; }
    router.push("/admin");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input className="w-full p-2 border" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="w-full p-2 border" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        {err && <div className="text-red-600">{err}</div>}
        <button className="px-4 py-2 bg-blue-600 text-white">Login</button>
      </form>
    </div>
  );
}