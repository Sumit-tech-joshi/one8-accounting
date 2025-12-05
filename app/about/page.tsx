// app/about/page.tsx
import Image from "next/image";
import Seo from "../../components/Seo"; // assumes you have this component
import ContactCta from "../../components/ContactCta"; // small client CTA included below
import aboutImage from "../../public/about-illustration.webp";
import AboutHighlights from "../../components/AboutHighlights";

export const revalidate = 60;

export default function AboutPage() {
  // Replace placeholders below with real data: FULL_NAME, FOUNDED_YEAR, LOCATION, YEARS_EXPERIENCE, SPECIALTIES
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

  // JSON-LD structured data (Organization + Person)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG.url + "#org",
        "name": ORG.name,
        "url": ORG.url,
        "logo": ORG.logo,
        "foundingDate": ORG.founded,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": ORG.location,
        },
      },
      {
        "@type": "Person",
        "@id": ORG.url + "#founder",
        "name": FOUNDER.name,
        "jobTitle": FOUNDER.title,
        "worksFor": { "@id": ORG.url + "#org" },
        "description": FOUNDER.bio,
      },
    ],
  };

  return (
    <>
      <Seo title={`About — ${ORG.name}`} description={pageDescription} />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white text-slate-900">
        <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Intro */}
          <div className="lg:col-span-6">
            <h1 className="text-3xl md:text-4xl font-extrabold mt-6">
              Trusted bookkeeping, payroll & CFO services for growing Canadian businesses
            </h1>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {ORG.name} delivers reliable bookkeeping, payroll, accounts payable and fractional CFO
              services designed to give founders clarity & time back. We combine practical finance
              operations with proactive advisory—so business owners can focus on growth, not
              spreadsheets.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-700">Founder</h3>
                <p className="mt-2 text-gray-700">
                  <strong>{FOUNDER.name}</strong> — {FOUNDER.title}. {FOUNDER.bio}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700">Our approach</h3>
                <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
                  <li>Clean bookkeeping and monthly reporting that’s easy to understand</li>
                  <li>Payroll administered with compliance and timeliness</li>
                  <li>Fractional finance leadership for forecasting & budgeting</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-700">Who we serve</h3>
                <p className="mt-2 text-gray-700">
                  Small and medium businesses, eCommerce, retail, professional services and not-for-profits seeking reliable finance operations.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <ContactCta />
            </div>
          </div>

          {/* Right: Image */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg">
              <Image
                src={aboutImage}
                alt="Accounting and bookkeeping illustration"
                className="w-full h-auto rounded-md shadow-sm"
                priority
              />
            </div>
          </div>
        </div>

        {/* Team / Values / Stats section */}
        <AboutHighlights />
      </main>
    </>
  );
}