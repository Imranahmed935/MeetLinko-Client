"use server";

import { serverFetch } from "@/lib/server-fetch";

interface ReviewPayload {
  id?:string
  rating: number;
  comment: string;
  travelPlanId: string;
  reviewerId: string;
}

export const getReviews = async (id: string ) => {
  try {
    const res = await serverFetch.get(`/review/${id}`);
    if (!res.ok) throw new Error("Failed to fetch reviews");
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return null;
  }
};


export const updateReview = async (id: string, payload: Partial<ReviewPayload>) => {
  try {
    const res = await serverFetch.patch(`/review/${id}`, {
      method: "PATCH", // PATCH method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // send updated fields
    });

    if (!res.ok) throw new Error("Failed to update review");

    const data = await res.json();
    return data; // { success, message, data }
  } catch (error) {
    console.error("Error updating review:", error);
    return null;
  }
};



export const deleteReview = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/review/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete review");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting review:", error);
    return null;
  }
};
