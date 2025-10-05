// components/Footer.tsx
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Image src="/logo.svg" alt="One8 Accounting" width={120} height={32} />
          <p className="text-sm text-gray-600 mt-4">Expert bookkeeping, payroll and CFO services for growing organizations.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Company</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Resources</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><Link href="/resources">Library</Link></li>
            <li><Link href="/resources/rss.xml">RSS</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>
      </div>

      <div className="bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 py-4 text-sm text-gray-500 flex justify-between items-center">
          <div>© {new Date().getFullYear()} One8 Accounting. All rights reserved.</div>
          <div><Link href="/privacy" className="hover:underline">Privacy</Link> · <Link href="/terms" className="hover:underline">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}
