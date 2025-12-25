const steps = [
  { title: "Discovery", desc: "Understand your needs and design the right workflow and tools." },
  { title: "Design", desc: "Custom workflows and integrations to streamline your operations." },
  { title: "Onboarding", desc: "Data migration, setup, and team training for a smooth start." },
  { title: "Delivery", desc: "Monthly delivery of reconciled books, payroll, and reporting." },
];

export default function Process() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {steps.map((s, idx) => (
        <div key={s.title} className="p-6 bg-white border rounded-md">
          <div className="text-sm font-semibold text-slate-700 mb-2">Step {idx + 1}</div>
          <h4 className="text-lg font-bold mb-2">{s.title}</h4>
          <p className="text-gray-600">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}