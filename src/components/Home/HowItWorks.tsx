export default function HowItWorks() {
  const steps = [
    { title: "Sign Up", desc: "Create your free account." },
    { title: "Create Plan", desc: "Add your destination & dates." },
    { title: "Find Buddy", desc: "Match with travelers." },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.title} className="p-6 shadow rounded">
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
