const testimonials = [
  {
    quote: "They transformed our financial reporting — now we can make decisions with confidence.",
    name: "Jules A",
    org: "Acme Nonprofit",
  },
  {
    quote: "Reliable payroll and fast response times. Makes our life easier.",
    name: "Sam B",
    org: "RetailCo",
  },
  {
    quote: "Excellent attention to detail and helpful monthly summaries.",
    name: "Priya M",
    org: "Tech Startup",
  },
];

export default function Testimonials() {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {testimonials.map((t, idx) => (
        <blockquote key={idx} className="p-6 border rounded bg-white">
          <p className="text-gray-800 mb-4">“{t.quote}”</p>
          <footer className="text-sm text-gray-600">— {t.name}, {t.org}</footer>
        </blockquote>
      ))}
    </div>
  );
}