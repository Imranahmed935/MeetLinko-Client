"use server"
import { serverFetch } from "@/lib/server-fetch";


export const getAllTravelPlans = async () => {
  try {
    const res = await serverFetch.get(`/admin/travelPlans`);

    if (!res.ok) {
      throw new Error("Failed to fetch travel plans");
    }

    const plans = await res.json();
    return plans;
  } catch (error) {
    console.error("Error fetching travel plans:", error);
    return null;
  }
};

export const getDeletePlan = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/admin/plans/${id}`);

    if (!res.ok) {
      throw new Error("Failed to delete travel plan");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting travel plan:", error);
    return null;
  }
};
