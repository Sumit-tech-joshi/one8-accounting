// components/LogosGrid.tsx
import Image from "next/image";

export default function LogosGrid() {
  const logos = [
    "/logos/logo1.png",
    "/logos/logo2.png",
    "/logos/logo3.png",
    "/logos/logo4.png",
    "/logos/logo5.png",
    "/logos/logo6.png",
  ];

  return (
    <div className="mt-6">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 items-center">
        {logos.map((src) => (
          <div key={src} className="flex items-center justify-center p-4 bg-white border rounded">
            <Image src={src} alt="client logo" width={120} height={40} style={{ objectFit: "contain" }} />
          </div>
        ))}
      </div>
    </div>
  );
}
