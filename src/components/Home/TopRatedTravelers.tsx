"use client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// ⭐ Rating Component
const Stars = ({ rating }: { rating: number }) => {
  const total = 5;
  return (
    <div className="flex justify-center mb-2">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default function TopRatedTravelers() {
  const router = useRouter();

  // Updated static data with new pictures
  const users = [
    {
      id: 1,
      fullName: "Alex Johnson",
      profileImage: "https://i.pravatar.cc/150?img=12",
      avgRating: 4.8,
      reviews: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      fullName: "Sofia Lee",
      profileImage: "https://i.pravatar.cc/150?img=25",
      avgRating: 4.5,
      reviews: [1, 2, 3, 4],
    },
    {
      id: 3,
      fullName: "Daniel Smith",
      profileImage: "https://i.pravatar.cc/150?img=36",
      avgRating: 4.9,
      reviews: [1, 2, 3, 4, 5, 6],
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          Top Rated Travelers
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300"
            >
              {/* Avatar */}
              <Avatar className="h-20 w-20 mx-auto">
                <AvatarImage src={user.profileImage} alt={user.fullName} />
                <AvatarFallback>
                  {user.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* Name */}
              <h3 className="text-xl font-semibold mt-4 text-gray-800">
                {user.fullName}
              </h3>

              {/* ⭐ Rating */}
              <Stars rating={Math.round(user.avgRating)} />

              {/* Average Rating */}
              <p className="text-gray-600 font-medium">
                Avg Rating: <span className="font-semibold">{user.avgRating}</span>
              </p>

              {/* Review Count */}
              <p className="text-sm text-gray-500 mt-1">
                {user.reviews.length} reviews
              </p>

              {/* View Profile Button */}
              <button
                onClick={() => router.push("/explore-travelers")}
                className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-2 px-4 rounded-full shadow hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
