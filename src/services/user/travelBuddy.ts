/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

export async function travelBuddy() {
    try {
        const response = await serverFetch.get(`/plan`);
        const result = await response.json();
        return {
            success: result.success,
            data: Array.isArray(result.data) ? result.data : [],
            meta: result.meta,
        };
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            data: [],
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export async function getSingleTravelById(id: string) {
  try {
    const response = await serverFetch.get(`/plan/${id}`);

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
