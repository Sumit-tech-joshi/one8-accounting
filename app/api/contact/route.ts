// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import sgMail from "@sendgrid/mail";

export const runtime = "nodejs";

const SENDGRID_KEY = process.env.SENDGRID_API_KEY ?? "";
if (SENDGRID_KEY) {
  try {
    sgMail.setApiKey(SENDGRID_KEY);
  } catch (e) {
    console.warn("SendGrid init failed:", e);
  }
}

async function verifyRecaptcha(token: string | null) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret)
    return {
      ok: true,
      info: "No server-side reCAPTCHA secret configured (skipping verify)",
    };

  if (!token) return { ok: false, info: "No reCAPTCHA token provided" };

  const verifyUrl = "https://www.google.com/recaptcha/api/siteverify";
  try {
    const res = await fetch(verifyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    if (!res.ok) {
      return { ok: false, info: `recaptcha verify returned ${res.status}` };
    }
    const json = await res.json();
    // Accept v2 success or v3 score threshold
    if (json.success === true && typeof json.score === "number") {
      return { ok: json.score >= 0.3, info: `score=${json.score}` };
    }
    return { ok: !!json.success, info: JSON.stringify(json) };
  } catch (err) {
    console.error("verifyRecaptcha fetch error:", err);
    // return explicit failure to caller so they get a useful message
    return { ok: false, info: `fetch error: ${(err as Error).message}` };
  }
}

function sanitize(input: unknown) {
  if (!input) return "";
  return String(input)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // parse fields
    const recaptchaToken = form.get("recaptchaToken")?.toString() ?? null;
    const firstName = form.get("firstName")?.toString() ?? "";
    const lastName = form.get("lastName")?.toString() ?? "";
    const email = form.get("email")?.toString() ?? "";
    const phone = form.get("phone")?.toString() ?? "";
    const company = form.get("company")?.toString() ?? "";
    const industry = form.get("industry")?.toString() ?? "";
    const message = form.get("message")?.toString() ?? "";

    // validation
    if (!firstName || !lastName || !email || !company || !industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // verify recaptcha (if secret present)
    if (process.env.RECAPTCHA_SECRET) {
      const rec = await verifyRecaptcha(recaptchaToken);
      if (!rec.ok) {
        console.error("reCAPTCHA failed:", rec.info);
        return NextResponse.json(
          { error: `reCAPTCHA verification failed: ${rec.info}` },
          { status: 400 }
        );
      }
    }

    // File handling (optional)
    let fileUrl: string | null = null;
    try {
      const file = form.get("file") as File | null;
      if (file && file.size && file.name) {
        const MAX = 10 * 1024 * 1024;
        if (file.size > MAX) {
          return NextResponse.json(
            { error: "File too large (max 10MB)" },
            { status: 400 }
          );
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `contacts/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

        // upload: wrap in try/catch (network may fail)
        try {
          const upload = await supabaseAdmin.storage
            .from("images")
            .upload(filename, buffer, {
              contentType: file.type || "application/octet-stream",
              upsert: false,
            });
          if (upload.error) {
            console.error("Supabase upload error:", upload.error);
            // proceed without fileUrl
          } else {
            const { data } = supabaseAdmin.storage
              .from("images")
              .getPublicUrl(filename);
            fileUrl = data.publicUrl;
          }
        } catch (upErr) {
          console.error("Supabase storage fetch/upload error:", upErr);
          // continue without fileUrl
        }
      }
    } catch (fileErr) {
      console.error("File handling error:", fileErr);
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
    const submission = insert.data;

    // SendGrid: best-effort after DB insert (log but do not break)
    let emailSent = false;
    if (
      process.env.SENDGRID_API_KEY &&
      process.env.EMAIL_TO &&
      process.env.EMAIL_FROM
    ) {
      try {
        const SITE_URL = process.env.SITE_URL ?? "https://yourdomain.com";
        const to = process.env.EMAIL_TO!;
        const from = process.env.EMAIL_FROM!;

        const subject = `New Quote Request — ${firstName} ${lastName}`;
        const plain = `
New quote request from ${firstName} ${lastName}

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}
Company: ${company}
Industry: ${industry}
Message:
${message}

File: ${fileUrl ?? "No attachment"}
Site: ${SITE_URL}
`.trim();

        const html = `
          <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #0f172a;">
            <h2>New quote request</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:6px 8px;font-weight:600">Name</td><td style="padding:6px 8px">${sanitize(firstName)} ${sanitize(lastName)}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Email</td><td style="padding:6px 8px">${sanitize(email)}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Phone</td><td style="padding:6px 8px">${sanitize(phone)}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Company</td><td style="padding:6px 8px">${sanitize(company)}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600">Industry</td><td style="padding:6px 8px">${sanitize(industry)}</td></tr>
              <tr><td style="padding:6px 8px;font-weight:600;vertical-align:top">Message</td><td style="padding:6px 8px;white-space:pre-wrap">${sanitize(message)}</td></tr>
              ${fileUrl ? `<tr><td style="padding:6px 8px;font-weight:600">Attachment</td><td style="padding:6px 8px"><a href="${fileUrl}" target="_blank" rel="noopener noreferrer">Download</a></td></tr>` : ""}
            </table>
          </div>
        `;

        const msg = {
          to,
          from,
          subject,
          text: plain,
          html,
        };

        await sgMail.send(msg);
        emailSent = true;
      } catch (err) {
        console.error("SendGrid send error:", err);
        emailSent = false;
      }
    } else {
      console.warn("SendGrid or email env not configured; skipping email send");
    }
    console.log({emailSent, submission})
    return NextResponse.json({ ok: true, emailSent, submission });
  } catch (err) {
    console.error("Contact route unexpected", err);
    return NextResponse.json(
      { error: "Unexpected server error", details: String(err) },
      { status: 500 }
    );
  }
}
