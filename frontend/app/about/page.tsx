// app/about/page.tsx
import Image from "next/image";
import Seo from "../../components/Seo";
import ContactCta from "../../components/ContactCta";
import aboutImage from "../../public/about-bg01.webp";
import AboutHighlights from "../../components/AboutHighlights";

export const revalidate = 60;

export default function AboutPage() {
  const ORG = {
    name: "One8 Accounting",
    url: process.env.SITE_URL ?? "https://example.com",
    logo: `${process.env.SITE_URL ?? ""}/logo.svg`,
    founded: "2020",
    location: "Vancouver, BC, Canada",
  };

  const FOUNDER = {
    name: "Vipin Kukreti, CA",
    title: "Founder & Principal",
    bio: `Vipin Kukreti (CA) is the founder of One8 Accounting. He brings over 10+ years of experience delivering bookkeeping, payroll and fractional CFO services to growing businesses.`,
  };

  const pageDescription =
    "One8 Accounting provides bookkeeping, payroll, controllership and CFO services for growing businesses. Learn about our approach, values, and the team.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG.url + "#org",
        name: ORG.name,
        url: ORG.url,
        logo: ORG.logo,
        foundingDate: ORG.founded,
        address: {
          "@type": "PostalAddress",
          addressLocality: ORG.location,
        },
      },
      {
        "@type": "Person",
        "@id": ORG.url + "#founder",
        name: FOUNDER.name,
        jobTitle: FOUNDER.title,
        worksFor: { "@id": ORG.url + "#org" },
        description: FOUNDER.bio,
      },
    ],
  };

  return (
    <>
      <Seo title={`About — ${ORG.name}`} description={pageDescription} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white text-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Content */}
          <div className="lg:col-span-6">
            <h1 className="text-3xl md:text-4xl font-extrabold mt-6">
              Trusted bookkeeping, payroll & tax services for growing businesses
            </h1>

            {/* Intro */}
            <p className="mt-5 text-gray-600 leading-relaxed">
              <strong>One8 Accounting</strong> helps small and mid-sized
              businesses stay organized, compliant, and confident with
              dependable bookkeeping, payroll, and tax support.
            </p>

            {/* Mission */}
            <p className="mt-3 text-gray-600 leading-relaxed">
              We simplify complex financial processes, maintain ongoing tax
              compliance, and deliver practical insights that support efficient
              growth.
            </p>

            {/* Services */}
            <h2 className="mt-6 text-lg font-semibold">Core Services</h2>

            <ul className="mt-3 space-y-1 text-gray-600 list-disc list-inside">
              <li>Day-to-day bookkeeping and transaction recording</li>
              <li>Payroll support and remittances</li>
              <li>GST and PST filings</li>
              <li>Year-end preparation and coordination</li>
            </ul>

            {/* Approach */}
            <p className="mt-4 text-gray-600 leading-relaxed">
              Our approach is detail-oriented and collaborative. Clients can
              expect clear communication, timely responses, and reliable
              service. When needed, we coordinate with trusted advisors to
              ensure complete support.
            </p>

            <div className="mt-6">
              <ContactCta />
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-6 flex items-center justify-center h-full">
            <div className="w-full max-w-lg">
              <Image
                src={aboutImage}
                alt="Accounting and bookkeeping illustration"
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>

        {/* Highlights / Values / Stats */}
        <AboutHighlights />
      </main>
    </>
  );
}
