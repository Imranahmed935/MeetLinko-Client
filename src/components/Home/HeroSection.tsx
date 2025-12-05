export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find Your Perfect Travel Buddy
        </h1>
        <p className="text-lg mb-8">
          Connect with travelers worldwide and explore together.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded font-semibold">
            Find Travel Buddy
          </button>
          <button className="border border-white px-6 py-3 rounded">
            Create Travel Plan
          </button>
        </div>
      </div>
    </section>
  );
}
