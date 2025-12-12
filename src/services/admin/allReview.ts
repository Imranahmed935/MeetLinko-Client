"use server"
import { serverFetch } from "@/lib/server-fetch";


export const getAllReviews = async () => {
  try {
    const res = await serverFetch.get(`/admin/allReviews`);

    if (!res.ok) {
      throw new Error("Failed to fetch reviews");
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};


export const AdminDeleteReview = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/admin/review/${id}`);

    if (!res.ok) {
      throw new Error("Failed to delete review");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting review:", error);
    return null;
  }
};
