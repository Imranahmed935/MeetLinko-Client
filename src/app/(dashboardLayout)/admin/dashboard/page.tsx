"use client";
export const dynamic = "force-dynamic";
import { useEffect, useState } from "react";
import { getAdminStats } from "@/services/admin/stats";
import { getCookie } from "@/services/auth/tokenHandlers";
import { Users, Airplay, Star } from "lucide-react"; 
import DailyUsers from "@/components/shared/DailyUsers";
import DailyPlan from "@/components/shared/DailyPlan";
import DailyReview from "@/components/shared/DailyReview";
import VerifiedUser from "@/components/shared/VerifiedUser";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<{
    users: number;
    travelPlans: number;
    reviews: number;
  }>({
    users: 0,
    travelPlans: 0,
    reviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const accessToken = await getCookie("accessToken");
      if (!accessToken) return;

      const response = await getAdminStats(accessToken);
      if (response.success) {
        setStats(response.data.total);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: <Users className="w-12 h-12 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Travel Plans",
      value: stats.travelPlans,
      icon: <Airplay className="w-12 h-12 text-green-500" />,
      bg: "bg-green-50",
    },
    {
      title: "Total Reviews",
      value: stats.reviews,
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      bg: "bg-yellow-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-10 text-gray-800">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`flex flex-col items-center justify-center p-6 rounded-xl border transition ${card.bg}`}
          >
            <div className="mb-4">{card.icon}</div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              {card.title}
            </h2>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <DailyUsers />
        <DailyPlan />
        <DailyReview />
      </div>
      <div>
        <VerifiedUser/>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
