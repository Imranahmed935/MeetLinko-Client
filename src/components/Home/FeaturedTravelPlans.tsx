export default function FeaturedTravelPlans() {
  const plans = [
    { place: "Thailand", date: "Jan - Feb", budget: "$1200" },
    { place: "Japan", date: "March", budget: "$2000" },
    { place: "Turkey", date: "April", budget: "$1500" },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Featured Travel Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className="bg-white p-6 rounded shadow">
              <h3 className="font-semibold">{plan.place}</h3>
              <p>{plan.date}</p>
              <p>{plan.budget}</p>
              <button className="mt-3 text-blue-600">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
