export async function verifyRecaptcha(token: string | null) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return { ok: true, info: "skipped" };
  if (!token) return { ok: false, info: "missing token" };

  type RecaptchaResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};
  const res = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    }
  );

  const json = (await res.json()) as RecaptchaResponse;
  if (json.success && typeof json.score === "number") {
    return { ok: json.score >= 0.3, info: `score=${json.score}` };
  }
  return { ok: json.success, info: JSON.stringify(json) };
}