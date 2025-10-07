"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import one8Logo from "../public/one8.png";

export default function Header() {
    const [open, setOpen] = useState(false);

  // header height in px (adjust if you change h-16)
  const HEADER_HEIGHT = 64;

  function scrollToServices(e?: React.MouseEvent) {
    if (e) e.preventDefault();
    const el = document.getElementById("services");
    if (!el) {
      // if not on home page, navigate to home with hash (fallback)
      // use location.assign or router.push if you want Next navigation
      window.location.href = "/#services";
      return;
    }

    // compute offset scroll to account for fixed header
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top, behavior: "smooth" });

    // focus for accessibility
    (el as HTMLElement).focus({ preventScroll: true });
    setOpen(false);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white border-b">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={one8Logo}
            alt="One8 Accounting"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
          <span className="font-semibold text-lg">One8 Accounting</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <div className="hover:underline" onClick={scrollToServices}>
            Services
          </div>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link
            href="/contact"
            className="text-white bg-slate-900 px-4 py-2 rounded"
          >
            Contact
          </Link>

          {/* 
          <Link href="/resources" className="hover:underline">Resources</Link> */}
          {/* */}
        </nav>

        <button
          aria-label="Menu"
          className="md:hidden p-2 rounded hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t">
          <div className="px-6 py-4 flex flex-col gap-3">
            {/* <Link href="/about">About</Link>
            <Link href="/resources">Resources</Link> */}
            <div onClick={scrollToServices} >Services</div>

            <Link href="/contact" className="font-medium">
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
