export default function PopularDestinations() {
  const destinations = [
    "Paris", "Bangkok", "Bali", "Dubai", "Tokyo", "Istanbul",
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Popular Destinations</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {destinations.map((city) => (
            <div key={city} className="p-10 border rounded shadow">
              <h3 className="text-xl font-semibold">{city}</h3>
              <button className="mt-4 text-blue-600">Explore</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
