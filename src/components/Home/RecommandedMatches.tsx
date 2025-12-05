export default function RecommendedMatches() {
  const users = ["Alex", "Sofia", "Daniel"];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Recommended Matches</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {users.map((user) => (
            <div key={user} className="border p-6 rounded shadow">
              <h3 className="text-xl">{user}</h3>
              <button className="mt-3 text-blue-600">View Profile</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
