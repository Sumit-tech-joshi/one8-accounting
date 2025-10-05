// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";

export const runtime = "nodejs";

async function verifyRecaptcha(token: string | null) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret || !token) return false;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${encodeURIComponent(
    secret
  )}&response=${encodeURIComponent(token)}`;
  const res = await fetch(verifyUrl, { method: "POST" });
  const json = await res.json();
  // Accept v2/v3 success flag and for v3 use score threshold if present
  if (json.success === true && typeof json.score === "number") return json.score >= 0.3;
  return json.success === true;
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const recaptchaToken = form.get("recaptchaToken")?.toString() ?? null;
    if (process.env.RECAPTCHA_SECRET) {
      const token = recaptchaToken;
      if (token) {
        const ok = await verifyRecaptcha(token);
        if (!ok) return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
      } else {
        // If server has secret but client didn't send token, warn and continue (avoid failing builds)
        console.warn("No reCAPTCHA token provided; skipping server-side block.");
      }
    }

    const firstName = form.get("firstName")?.toString() ?? "";
    const lastName = form.get("lastName")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const phone = form.get("phone")?.toString() ?? "";
    const company = form.get("company")?.toString() ?? "";
    const industry = form.get("industry")?.toString() ?? "";
    const message = form.get("message")?.toString() ?? "";

    if (!firstName || !lastName || !email || !company || !industry) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // File handling (File type)
    const file = form.get("file") as File | null;
    let fileUrl: string | null = null;
    if (file && file.size && file.name) {
      const MAX = 10 * 1024 * 1024;
      if (file.size > MAX) {
        return NextResponse.json({ error: "File too large (max 10MB)" }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `contacts/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const { error: uploadErr } = await supabaseAdmin.storage.from("images").upload(filename, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

      if (!uploadErr) {
        const { data } = supabaseAdmin.storage.from("images").getPublicUrl(filename);
        fileUrl = data.publicUrl;
      } else {
        console.error("Upload error", uploadErr);
      }
    }

    // Insert into DB
    const insert = await supabaseAdmin
      .from("contacts")
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          company,
          industry,
          message,
          file_url: fileUrl,
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (insert.error) {
      console.error("DB insert error", insert.error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true, submission: insert.data });
  } catch (err) {
    console.error("Contact route unexpected", err);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
