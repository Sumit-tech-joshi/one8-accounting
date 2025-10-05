const industries = [
  { title: "Non-profits", href: "/industries/nonprofits" },
  { title: "eCommerce", href: "/industries/ecommerce" },
  { title: "Retail", href: "/industries/retail" },
  { title: "Professional Services", href: "/industries/professional" },
  { title: "Food & Beverage", href: "/industries/food" },
  { title: "Healthcare", href: "/industries/healthcare" },
];

export default function Industries() {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {industries.map((i) => (
        <a key={i.title} href={i.href} className="p-6 bg-white border rounded hover:shadow block">
          <h4 className="text-lg font-semibold">{i.title}</h4>
          <p className="text-sm text-gray-600 mt-2">Tailored workflows and reporting for {i.title.toLowerCase()}.</p>
        </a>
      ))}
    </div>
  );
}
