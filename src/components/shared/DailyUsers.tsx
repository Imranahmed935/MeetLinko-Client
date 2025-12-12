/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Label,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#14B8A6",
  "#6366F1",
];

const DailyUsers = () => {
  const [dailyUsers, setDailyUsers] = useState<
    { date: string; count: number }[]
  >([]);

  useEffect(() => {
    const load = async () => {
      const token = await getCookie("accessToken");
      if (!token) return;
      const res = await getAdminStats(token);

      if (res.success) setDailyUsers(res.data.daily.users);
    };
    load();
  }, []);

  // Total count for percentage
  const total = dailyUsers.reduce((a, b) => a + b.count, 0);

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 transition-all duration-300">
  
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📊 Daily Registered Users
      </h1>

      <div className="flex items-center justify-between gap-6">
       
        <ResponsiveContainer width="60%" height={280}>
          <PieChart>
            <Pie
              data={dailyUsers}
              outerRadius={95}
              innerRadius={50}
              paddingAngle={3}
              dataKey="count"
              nameKey="date"
              label={({ value }) => (
                <text
                  fill="#fff"
                  fontSize={12}
                  fontWeight={600}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {((value / total) * 100).toFixed(1)}%
                </text>
              )}
            >
              {dailyUsers.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, name: string, props: any) => [
                `${value} users`,
                props.payload.date,
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* LEGEND */}
        <div className="space-y-3">
          {dailyUsers.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: COLORS[index % COLORS?.length] }}
              ></span>
              <p className="text-sm text-gray-700 font-medium">
                {item.date} —{" "}
                <span className="font-semibold">
                  {((item.count / total) * 100).toFixed(1)}%
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyUsers;
