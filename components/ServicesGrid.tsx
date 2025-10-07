'use client'
import {
  BookOpenCheck,
  Users2,
  Calculator,
  BarChart3,
  FileText,
  BookKey
} from "lucide-react";
import React, { useRef } from 'react';

const services = [
  {
    title: "Bookkeeping",
    desc: "Stay on top of your finances with clean, real-time insights that power better decisions. We’ll keep your books tidy and up to date, so you can spend less time stressing about numbers and more time running your business.",
    href: "/services/bookkeeping",
    icon: BookOpenCheck,
  },
  {
    title: "Catch-Up Bookkeeping",
    desc: "Turn backlog into clarity. We transform piles of missed entries into clean, up-to-date records, giving you real-time insights and peace of mind.",
    href: "/services/catch-up",
    icon: BookKey,
  },
  {
    title: "Payroll",
    desc: "Paying your team shouldn’t be stressful. We handle payroll from start to finish—accurate, timely, and fully compliant with tax regulations—so you can focus on growing your business while your employees get paid right, every time.",
    href: "/services/payroll",
    icon: Users2,
  },
  {
    title: "GST/HST and PST Filing",
    desc: "GST/HST and PST compliance can be overwhelming—but it doesn’t have to be. We handle the calculations, deadlines, and filings with accuracy, so your business stays compliant and runs stress-free.",
    href: "/services/accounts-payable",
    icon: Calculator,
  },
  {
    title: "Fractional Controller",
    desc: "Drive growth with clarity and control. Our fractional controllership services deliver expert forecasting, budgeting, and cash flow planning—so your business stays aligned with its goals and prepared for the future.",
    href: "/services/fractional-controller",
    icon: BarChart3,
  },
  {
    title: "Tax Services",
    desc: "Your time is valuable—don’t waste it buried in tax forms. We streamline your tax filings with precision and insight, ensuring compliance while maximizing every opportunity to save.",
    href: "/services/cfo",
    icon: FileText,
  },
];

export default function ServicesGrid() {
  return (
    // Add id and tabIndex so it can be targeted and focused
    <section id="services" tabIndex={-1} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.title} className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col items-start">
              <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-xl">
                <Icon size={28} strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
