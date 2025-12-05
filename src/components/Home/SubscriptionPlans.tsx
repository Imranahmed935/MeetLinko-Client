export default function SubscriptionPlans() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Premium Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border p-6 rounded">Monthly</div>
          <div className="border p-6 rounded">Yearly</div>
          <div className="border p-6 rounded">Verified Badge</div>
        </div>
      </div>
    </section>
  );
}
