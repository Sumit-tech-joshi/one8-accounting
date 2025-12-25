// components/ContactForm.tsx
"use client";

import { useState, useRef, useEffect } from "react";

declare global {
  interface Window {
    grecaptcha?: {
      execute: (siteKey: string, opts?: { action: string }) => Promise<string>;
      getResponse: (widgetId?: number) => string;
    };
  }
}

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  message: string;
};

type ContactPayload = FormValues & {
  recaptchaToken?: string;
};

const industries = [
  "Construction & Trades",
  "eCommerce",
  "Financial Services",
  "Fitness",
  "Food & Beverages",
  "Healthcare",
  "Manufacturing",
  "Not-for-Profit",
  "Professional Services",
  "Real Estate",
  "Retail",
  "Technology",
  "Travel & Hospitality",
  "CPA Partner Firm",
  "Others",
  "Holding Company/Investment",
];

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    message: "",
  });
  const [fileName, setFileName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;
    if (!window.grecaptcha) {
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);

  function update<K extends keyof FormValues>(k: K, v: FormValues[K]) {
    setValues((p) => ({ ...p, [k]: v }));
  }

  function markTouched(...fields: Array<keyof FormValues>) {
    setTouched((t) => {
      const copy = { ...t };
      fields.forEach((f) => (copy[f as string] = true));
      return copy;
    });
  }

  function validate() {
    if (!values.firstName.trim()) return "Please enter your first name";
    if (!values.lastName.trim()) return "Please enter your last name";
    if (!values.email.trim()) return "Please enter your email";
    if (!/^\S+@\S+\.\S+$/.test(values.email))
      return "Please enter a valid email";
    if (!values.company.trim()) return "Please enter company name";
    if (!values.industry.trim()) return "Please select an industry";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    markTouched("firstName", "lastName", "email", "company", "industry");
    const verr = validate();
    if (verr) {
      setError(verr);
      return;
    }

    setSubmitting(true);
    try {
      const payload: ContactPayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        company: values.company,
        industry: values.industry,
        message: values.message,
      };

      // const file = fileRef.current?.files?.[0] ?? null;
      // if (file) payload.file = file;

      // const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      // if (siteKey && window.grecaptcha?.execute) {
      //   try {
      //     const token = await window.grecaptcha.execute(siteKey, {
      //       action: "submit",
      //     });
      //     fd.append("recaptchaToken", token);
      //   } catch {
      //     // ignore recaptcha failure on client — server will handle if secret is set
      //   }
      // }
      const url = `${process.env.NEXT_PUBLIC_API_URL}?key=${process.env.NEXT_PUBLIC_API_URL_KEY}/api/contact`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Submission failed");
      setSuccess(
        "Thanks — your request has been submitted. We'll contact you soon."
      );
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        message: "",
      });
      if (fileRef.current) fileRef.current.value = "";
      setFileName(null);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>

      {success && (
        <div className="p-3 mb-4 bg-green-50 text-green-800 border border-green-100 rounded">
          {success}
        </div>
      )}
      {error && (
        <div
          role="alert"
          className="p-3 mb-4 bg-red-50 text-red-800 border border-red-100 rounded"
        >
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First name */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">
            First name <span aria-hidden>*</span>
          </span>
          <input
            value={values.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            onBlur={() => markTouched("firstName")}
            className="mt-2 p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="First name"
            aria-required
            aria-invalid={touched.firstName && !values.firstName}
          />
        </label>

        {/* Last name */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">
            Last name <span aria-hidden>*</span>
          </span>
          <input
            value={values.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            onBlur={() => markTouched("lastName")}
            className="mt-2 p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Last name"
            aria-required
            aria-invalid={touched.lastName && !values.lastName}
          />
        </label>

        {/* Email */}
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Email <span aria-hidden>*</span>
          </span>
          <input
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => markTouched("email")}
            className="mt-2 p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="you@company.com"
            aria-required
            aria-invalid={touched.email && !/^\S+@\S+\.\S+$/.test(values.email)}
          />
        </label>

        {/* Phone */}
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700">
            Phone number
          </span>
          <input
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="mt-2 p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="+1 (555) 555-5555"
          />
        </label>

        {/* Company */}
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Company name <span aria-hidden>*</span>
          </span>
          <input
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            onBlur={() => markTouched("company")}
            className="mt-2 p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Company name"
            aria-required
            aria-invalid={touched.company && !values.company}
          />
        </label>

        {/* Industry */}
        <div className="md:col-span-2">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">
              Industry <span aria-hidden>*</span>
            </span>
            <select
              value={values.industry}
              onChange={(e) => update("industry", e.target.value)}
              onBlur={() => markTouched("industry")}
              className="mt-2 w-full p-3 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-required
            >
              <option value="">Please Select</option>
              {industries.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            {touched.industry && !values.industry && (
              <p className="mt-1 text-sm text-red-600">
                Please complete this required field.
              </p>
            )}
          </label>
        </div>

        {/* Message */}
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm font-medium text-slate-700">
            Please share any additional company details that may help us prepare
            a quote. (Optional)
          </span>
          <textarea
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className="mt-2 p-3 h-40 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 resize-vertical"
            placeholder="Tell us about current bookkeeping, payroll, number of transactions, systems, challenges..."
          />
        </label>

        {/* File upload */}
        {/* <div className="md:col-span-2">
          <label className="flex flex-col">
            <span className="text-sm font-medium text-slate-700">
              Attach files (optional)
            </span>
            <input
              ref={fileRef}
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              type="file"
              accept=".pdf,.xlsx,.csv,.zip,.doc,.docx,.png,.jpg"
              className="mt-2"
            />
            {fileName && (
              <div className="text-sm text-gray-600 mt-1">
                Selected: {fileName}
              </div>
            )}
            <div className="mt-4">
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <div className="text-xs text-gray-500">
                  This form is protected by reCAPTCHA.
                </div>
              )}
            </div>
          </label>
        </div> */}
      </div>

      <div className="mt-6 flex items-center justify-end">
        {/* <div className="text-xs text-gray-600">
          By submitting you agree to our{" "}
          <a className="underline" href="/privacy">
            Privacy Policy
          </a>
          .
        </div> */}
        <button
          type="submit"
          disabled={submitting}
          className="px-8 py-4 bg-purple-800 text-white rounded-full text-lg font-semibold shadow hover:bg-purple-900 disabled:opacity-60"
        >
          {submitting ? "Sending..." : "SUBMIT"}
        </button>
      </div>
    </form>
  );
}
