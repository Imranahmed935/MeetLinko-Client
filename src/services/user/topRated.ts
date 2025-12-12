"use server"
import { serverFetch } from "@/lib/server-fetch";

export const getTopRatedUsers = async () => {
  try {
    const res = await serverFetch.get(`/user/top`);
    const data = await res.json();
    console.log(data)
    return data; 
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
};
