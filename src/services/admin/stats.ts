/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getAdminStats = async (token: string) => {
  try {
    const res = await serverFetch.get("/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return { success: data.success, data: data.data };
  } catch (error: any) {
    console.error(error);
    return { success: false, data: { users: 0, travelPlans: 0, reviews: 0 } };
  }
};

export const getVerifiedUsers = async (token: string) => {
  try {
    const res = await serverFetch.get("/admin/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return {
      success: data.success,
      data: data.data, 
    };
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      data: [], // return empty array on error
    };
  }
};

