"use client";

import { getAdminStats } from "@/services/admin/stats";
import { useEffect, useState } from "react";


const AdminDashboardPage = () => {
  const [stats, setStats] = useState<{ users: number; travelPlans: number; reviews: number }>({
    users: 0,
    travelPlans: 0,
    reviews: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getAdminStats();
      console.log(response)
      if (response.success) {
        setStats(response.data);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold mt-4">{stats.users}</p>
        </div>

        {/* Total Travel Plans */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Travel Plans</h2>
          <p className="text-3xl font-bold mt-4">{stats.travelPlans}</p>
        </div>

        {/* Total Reviews */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-600">Total Reviews</h2>
          <p className="text-3xl font-bold mt-4">{stats.reviews}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
