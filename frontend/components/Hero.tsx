import Image from "next/image";
import HeroImage from "../public/home01.webp";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center">
        {/* Text column */}
        <div className="z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Bookkeeping and payroll services{" "}
            <span className="text-slate-700">that scale</span> with your
            business
          </h1>
          <p className="mt-28 text-gray-600 max-w-xl">
            Dedicated bookkeeping, payroll, tax compliance & filing, and
            controllership services—so you can focus on growth while we handle
            the numbers.
          </p>

          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-block bg-slate-900 text-white px-5 py-3 rounded shadow hover:bg-slate-800 transition"
            >
              Get a Quote
            </Link>
          </div>
        </div>

        {/* Image column */}
        <div className="relative h-[400px] md:h-[35vw] w-[95vw] md:w-[35vw]">
          <div className="absolute top-0 right-0 bottom-0 w-[120vw] md:w-[60vw]">
            <Image
              src={HeroImage}
              alt="Financial operations illustration"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
