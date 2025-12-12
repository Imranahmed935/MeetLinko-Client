/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export const getAdminStats = async () => {
  try {
    const res = await serverFetch.get("/admin/stats");
    const data = await res.json();
    console.log(data)
    return {
      success: data.success,
      data: data.data, 
    };
  } catch (error: any) {
    console.error(error);
    return { success: false, data: { users: 0, travelPlans: 0, reviews: 0 } };
  }
};
