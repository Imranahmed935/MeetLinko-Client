"use client";
import { useRouter } from "next/navigation"; // Next.js 13+ app router

export default function RecommendedMatches() {
  const router = useRouter();

  const users = [
    { name: "Alex", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Sofia", avatar: "https://i.pravatar.cc/150?img=2" },
    { name: "Daniel", avatar: "https://i.pravatar.cc/150?img=3" },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Recommended Matches</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {users.map((user) => (
            <div
              key={user.name}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full border-4 border-blue-100 object-cover"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>

              {/* Subtitle */}
              <p className="text-gray-500 mb-4">Traveler & Adventure Enthusiast</p>

              {/* View Profile Button */}
              <button
                onClick={() => router.push(`/explore-travelers`)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>

        {/* Find All Travelers Button */}
        <button
          onClick={() => router.push("/explore-travelers")}
          className="mt-6 inline-block bg-white border border-blue-500 text-blue-500 font-semibold py-3 px-6 rounded-full shadow hover:bg-blue-500 hover:text-white transition-all duration-300"
        >
          Find All Travelers
        </button>
      </div>
    </section>
  );
}
