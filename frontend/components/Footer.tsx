// components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Linkedin,
  Twitter, // X
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import one8Logo from "../public/one8.png";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    // TODO: replace with your newsletter or API endpoint (Mailchimp, ConvertKit, backend)
    // Example: await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Image src={one8Logo} alt="One8 Accounting" width={140} height={40} priority />
          </div>

          <p className="text-sm text-slate-600 max-w-sm">
            Expert bookkeeping, payroll, and tax services designed to free founders to focus on growth.
          </p>
{/* 
          <div className="flex items-center gap-4 mt-2">
            <a
              href="https://www.linkedin.com" // replace with firm LinkedIn
              target="_blank"
              rel="noopener noreferrer"
              aria-label="One8 Accounting on LinkedIn"
              className="group inline-flex items-center gap-2 text-slate-700 hover:text-slate-900"
            >
              <Linkedin className="w-5 h-5 transition-transform group-hover:translate-y-[-1px]" />
              <span className="text-sm">LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-slate-400 ml-1" />
            </a>

            <a
              href="https://x.com" // replace with X/Twitter if available
              target="_blank"
              rel="noopener noreferrer"
              aria-label="One8 Accounting on X"
              className="group inline-flex items-center gap-2 text-slate-700 hover:text-slate-900"
            >
              <Twitter className="w-5 h-5" />
              <span className="text-sm">X</span>
            </a>
          </div> */}
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-6 md:col-span-1">
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/about" className="hover:underline">About</Link></li>
              <li><Link href="/" className="hover:underline">Services</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Legal & Help</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link href="/privacy" className="hover:underline">Privacy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
              <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
            </ul>
          </div> */}
        </div>

        {/* Contact & Newsletter */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-3">Contact</h4>

          <ul className="text-sm text-slate-600 space-y-3">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-700" />
              <a href="mailto:vipin@one8accounting.com" className="hover:underline">vipin@one8accounting.com </a>
            </li>
            {/* <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-700" />
              <a href="tel:+1234567890" className="hover:underline">+1 (111) 111111</a>
            </li> */}
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-700" />
              <span>Vancouver, BC</span>
            </li>
          </ul>

        </div>
      </div>

      <div className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-slate-600 flex flex-col justify-between items-center gap-3">
          <div>© {new Date().getFullYear()} One8 Accounting. All rights reserved.</div>
          {/* <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <span className="hidden md:inline text-slate-300">·</span>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <span className="hidden md:inline text-slate-300">·</span>
            <Link href="/sitemap.xml" className="hover:underline">Sitemap</Link>
          </div> */}
        </div>
      </div>
    </footer>
  );
}