import { Router } from "express";
import { verifyRecaptcha } from "../services/recaptcha.service";
import { sendContactEmail } from "../services/sendgrid.service";
import { supabaseAdmin } from "../services/supabase.service";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      message,
      recaptchaToken,
    } = req.body;
    console.log({body: req.body })
    // validation (same as before)
    if (!firstName || !lastName || !email || !company || !industry) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // recaptcha
    const rec = await verifyRecaptcha(recaptchaToken);
    if (!rec.ok) {
      return res.status(400).json({ error: "reCAPTCHA failed" });
    }

    // DB insert
    const insert = await supabaseAdmin.from("contacts").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      company,
      industry,
      message,
      created_at: new Date().toISOString(),
    });

    if (insert.error) {
      console.error(insert.error);
    }

    // email (best effort)
    await sendContactEmail({
      firstName,
      lastName,
      email,
      phone,
      company,
      industry,
      message,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;