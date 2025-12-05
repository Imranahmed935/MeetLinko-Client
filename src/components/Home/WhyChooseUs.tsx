export default function WhyChooseUs() {
  const features = [
    "Verified Travelers",
    "Smart Match System",
    "Real Reviews & Ratings",
    "Secure Payments",
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((item) => (
            <div key={item} className="bg-white p-6 rounded shadow">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
