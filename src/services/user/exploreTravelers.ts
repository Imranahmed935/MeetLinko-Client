/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";


export async function exploreTravelers(filters?: { interest?: string; page?: number; limit?: number }) {
    try {
        const queryParams = new URLSearchParams();

        if (filters?.interest) queryParams.append("interest", filters.interest);
        if (filters?.page) queryParams.append("page", String(filters.page));
        if (filters?.limit) queryParams.append("limit", String(filters.limit));

        const response = await serverFetch.get(`/user?${queryParams.toString()}`);
        const result = await response.json();

        return {
            success: result.success,
            data: Array.isArray(result.data) ? result.data : [],
            meta: result.meta,
        };
    } catch (error: any) {
        return {
            success: false,
            data: [],
            message: error.message,
        };
    }
}


export async function getExploreTravelerById(id: string) {
  console.log(id)
  try {
    const response = await serverFetch.get(`/user/${id}`);

    const result = await response.json();
    console.log(result)
    return {
      success: result.success,
      data: result || null,
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      data: null,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}
