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

const DailyPlan = () => {
  const [dailyPlans, setDailyPlans] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    const load = async () => {
      const token = await getCookie("accessToken");
      if (!token) return;
      const res = await getAdminStats(token);
      if (res.success) setDailyPlans(res.data.daily.travelPlans);
    };
    load();
  }, []);

  const totalCount = dailyPlans.reduce((sum, plan) => sum + plan.count, 0);

  return (
    <div className="bg-white p-6 rounded-xl border transition">
      <h1 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b-2 border-purple-500 w-max">
        Daily Travel Plans
      </h1>

      <div className="flex items-center justify-between gap-4">
        <ResponsiveContainer width="60%" height={250}>
          <PieChart>
            <Pie
              data={dailyPlans}
              outerRadius={80}
              innerRadius={40} // makes it a donut
              dataKey="count"
              nameKey="date"
              label={({ name, percent }) => `${(percent! * 100).toFixed(1)}%`} // percentage inside slices
            >
              {dailyPlans.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
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
          formatter={(value, entry) => {
            const plan = dailyPlans.find(p => p.date === value);
            const percent = plan ? ((plan.count / totalCount) * 100).toFixed(1) : "0.0";
            return `${value} — ${percent}%`;
          }}
        />
      </div>
    </div>
  );
};

export default DailyPlan;
