import "./globals.css";
import type { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";


export const metadata = {
  title: "One8 Accounting — Bookkeeping & Payroll Services",
  description:
    "Expert bookkeeping, payroll, controllership, and CFO services for businesses and nonprofits.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans antialiased text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}