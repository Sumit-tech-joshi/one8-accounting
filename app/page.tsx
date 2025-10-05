import Hero from "../components/Hero";

// import LogosGrid from "../components/LogosGrid";
import ServicesGrid from "../components/ServicesGrid";
// import Process from "../components/Process";
// import Industries from "../components/Industries";
// import Testimonials from "../components/Testimonials";
import Seo from "../components/Seo";

export default function Home() {
  return (
    <>
      <Seo
        title="Bookkeeping & Payroll Services — One8 Accounting"
        description="Dedicated bookkeeping, payroll, controllership, and CFO services that scale with your business."
      />

      <Hero />

      {/* Will be added if any collaboration */}
      {/* <section className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-sm font-semibold text-gray-500 tracking-wide">Trusted by</h2>
          <LogosGrid />
        </div>
      </section> */}

      <section className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Services</h2>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Core financial operations delivered by experienced specialists. We provide monthly bookkeeping, payroll, accounts payable, controllership and fractional CFO services tailored for growing
            businesses and nonprofits.
          </p>
          <ServicesGrid />
        </div>
      </section>


      {/* Future use */}

      {/* <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Our process</h2>
          <Process />
        </div>
      </section> */}

      {/* <section className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Industries we support</h2>
          <Industries />
        </div>
      </section> */}

      {/* <section className="py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">What our clients say</h2>
          <Testimonials />
        </div>
      </section> */}

      <section className="py-32 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to make your finance operations effortless?</h3>
          <p className="mb-6 max-w-2xl mx-auto">Get a quote and see how we can help you focus on growth while we handle the numbers.</p>
          <a href="/contact" className="inline-block bg-white text-slate-900 font-medium px-6 py-3 rounded shadow">
            Get a Quote
          </a>
        </div>
      </section>
    </>
  );
}