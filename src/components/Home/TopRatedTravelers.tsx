export default function TopRatedTravelers() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Top Rated Travelers</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">⭐⭐⭐⭐⭐ Sarah</div>
          <div className="bg-white p-6 rounded shadow">⭐⭐⭐⭐⭐ Mark</div>
          <div className="bg-white p-6 rounded shadow">⭐⭐⭐⭐⭐ Lina</div>
        </div>
      </div>
    </section>
  );
}
