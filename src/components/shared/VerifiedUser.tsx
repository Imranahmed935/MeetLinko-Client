/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { getVerifiedUsers } from "@/services/admin/stats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getCookie } from "@/services/auth/tokenHandlers";

const VerifiedUser = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await getCookie("accessToken");
      if (!token) return;

      const res = await getVerifiedUsers(token);
      if (res.success) setUsers(res.data);
    };

    fetchUsers();
  }, []);

  // Prepare chart data: group users by creation date
  const aggregatedData: { [key: string]: number } = {};
  users.forEach(user => {
    const date = new Date(user.createdAt).toLocaleDateString();
    aggregatedData[date] = (aggregatedData[date] || 0) + 1;
  });

  const finalData = Object.keys(aggregatedData).map(date => ({
    date,
    count: aggregatedData[date],
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Verified Users</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={finalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VerifiedUser;
