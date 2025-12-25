import ContactForm from "../../components/ContactForm";
import Seo from "../../components/Seo";
import Image from "next/image";
import contactImage from "../../public/contact.webp";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Get a Quote — One8 Accounting"
        description="Request a quote for bookkeeping, payroll or CFO services. Fill out the form and we'll get back within 2 business days."
      />
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold mb-4">
            Request a Price Quote
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Fill in the details below and we’ll provide a customized quote for
            your accounting needs.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-2 gap-10">
            <div>
              <ContactForm />
            </div>
            <div className="flex items-center justify-center h-full">
              <div className="w-full max-w-lg">
                <Image
                  src={contactImage}
                  alt="Accounting and bookkeeping illustration"
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
