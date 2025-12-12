"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/services/admin/stats";
import { getCookie } from "@/services/auth/tokenHandlers";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#14B8A6", "#6366F1"];

const DailyReview = () => {
  const [dailyReviews, setDailyReviews] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const token = await getCookie("accessToken");
      if (!token) return;
      const res = await getAdminStats(token);
      if (res.success) setDailyReviews(res.data.daily.reviews);
    };
    load();
  }, []);

  const totalCount = dailyReviews.reduce((sum, review) => sum + review.count, 0);

  return (
    <div className="bg-white p-6 rounded-xl border transition">
      <h1 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b-2 border-red-500 w-max">
        Daily Reviews
      </h1>

      <div className="flex items-center justify-between gap-4">
        <ResponsiveContainer width="60%" height={250}>
          <PieChart>
            <Pie
              data={dailyReviews}
              outerRadius={80}
              innerRadius={40} // Donut style
              dataKey="count"
              nameKey="date"
              label={({ percent }) => `${(percent! * 100).toFixed(1)}%`} // show percentage inside slices
            >
              {dailyReviews.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS?.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value} (${((value / totalCount) * 100).toFixed(1)}%)`,
                name,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="left"
          formatter={(value) => {
            const review = dailyReviews.find(r => r.date === value);
            const percent = review ? ((review.count / totalCount) * 100).toFixed(1) : "0.0";
            return `${value} — ${percent}%`;
          }}
        />
      </div>
    </div>
  );
};

export default DailyReview;
