import Image from "next/image";
import HeroImage from "../public/hero.png";

export default function Hero() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Bookkeeping and payroll services{" "}
            <span className="text-slate-700">that scale</span> with your
            business
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl">
            Dedicated financial operations — bookkeeping, payroll,
            controllership and CFO services — so you can focus on growth without
            hiring a full-time finance team.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-block bg-slate-900 text-white px-5 py-3 rounded shadow"
            >
              Get a Quote
            </a>

          </div>

        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <Image
              src={HeroImage}
              alt="Financial operations illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
