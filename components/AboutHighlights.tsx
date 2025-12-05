// components/AboutHighlights.tsx
import {
  ShieldCheck,
  Clock,
  Users,
  Sparkles,
  MapPin,
  FileText,
} from "lucide-react";
import React from "react";

type CardProps = {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  accent?: string;
};

function Card({ icon: Icon, title, children, accent = "bg-white" }: CardProps) {
  return (
    <div
      className={`flex gap-4 items-start p-6 rounded-2xl ${accent} border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200`}
      role="article"
      aria-label={title}
    >
      <div className="flex-none">
        <div className="w-12 h-12 rounded-lg bg-white/60 ring-1 ring-slate-100 flex items-center justify-center shadow-sm">
          <Icon className="w-6 h-6 text-slate-800" />
        </div>
      </div>

      <div className="min-w-0">
        <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
        <div className="mt-2 text-slate-600 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function AboutHighlights() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Card 1: Values */}
          <Card icon={Sparkles} title="Our values" accent="bg-white">
            <p>
              Clarity, integrity and practical advice. We deliver clear monthly
              reporting, honest recommendations and prompt communication.
            </p>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside space-y-1">
              <li>Transparent reporting</li>
              <li>Timely responses & deadlines met</li>
              <li>Practical recommendations, not jargon</li>
            </ul>
          </Card>

          {/* Card 2: Why clients choose us */}
          <Card icon={ShieldCheck} title="Why clients choose us" accent="bg-white">
            <p>
              We combine CA-level oversight with hands-on bookkeeping to give
              reliable month-end closes and strategic guidance.
            </p>
            <ul className="mt-3 text-sm text-slate-600 list-disc list-inside space-y-1">
              <li>Experienced CA leadership + trained bookkeeping team</li>
              <li>Fast month-end discipline & accurate payroll</li>
              <li>Actionable forecasts that drive decisions</li>
            </ul>
          </Card>

          {/* Card 3: Quick facts (styled differently) */}
          <div className="flex gap-4 items-start p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex gap-4 items-start">
              <div className="flex-none">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 " />
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Quick facts</h4>
                <div className="mt-2 text-sm text-slate-600">
                  <dl className="space-y-3">
                    <div>
                      <dt className="font-medium">Founded</dt>
                      <dd>2020</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Location</dt>
                      <dd>Vancouver, BC</dd>
                    </div>
                    <div>
                      <dt className="font-medium">Primary services</dt>
                      <dd>Bookkeeping · Payroll · Fractional CFO</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-4">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-slate-900 font-medium shadow hover:opacity-95"
                  >
                    <FileText className="w-4 h-4" />
                    Request a quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}