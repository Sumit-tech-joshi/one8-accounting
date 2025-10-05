import ContactForm from "../../components/ContactForm";
import Seo from "../../components/Seo";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Get a Quote — One8 Accounting"
        description="Request a quote for bookkeeping, payroll or CFO services. Fill out the form and we'll get back within 2 business days."
      />
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold mb-4">Request a Price Quote</h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Fill in the details below and we’ll provide a customized quote for your accounting needs.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <ContactForm />
            </div>

            <aside className="space-y-6 text-sm text-gray-700">
              <div>
                <h3 className="font-semibold text-lg mb-2">What we need</h3>
                <p>Company details, current software, monthly transaction estimate, payroll headcount and any files (P&L, balance sheet, previous invoices) help us prepare an accurate estimate.</p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">What to expect</h3>
                <ul className="list-disc pl-5">
                  <li>We’ll review your submission and reply within 1–2 business days.</li>
                  <li>We may request a short call to clarify scope.</li>
                  <li>Quotes are non-binding until we finalize engagement details.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Security & Confidentiality</h3>
                <p>Files you upload are stored securely. We’ll only use submitted data to prepare and deliver your quote.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
