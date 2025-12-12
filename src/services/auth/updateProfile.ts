"use server"
import { serverFetch } from "@/lib/server-fetch";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const updateProfile = async (_currentState: string, formData: FormData) => {
  const id = formData.get("id")?.toString();
  

  const file = formData.get("file") as File | null;
  console.log(file)

  const getValue = (key: string) => {
    const value = formData.get(key);
    return value && value !== "null" && value !== "" ? value : undefined;
  };
  
  const getStringArray = (key: string) => {
    const value = formData.get(key);
    if (typeof value === "string") return value.split(",").map((s) => s.trim());
    return [];
  };

  const rawData = {
    fullName: getValue("fullName"),
    bio: getValue("bio"),
    currentLocation: getValue("currentLocation"),
    travelInterests: getStringArray("travelInterests"),
    visitedCountries: getStringArray("visitedCountries"),
  };

  console.log(rawData)

  const uploadFormData = new FormData();
  uploadFormData.append("user", JSON.stringify(rawData));

  console.log(uploadFormData)
  if (file) uploadFormData.append("file", file);
return
  try {
    const res = await serverFetch.patch(`/user/update/${id}`, {
      body: uploadFormData,
    });
    return await res.json();
  } catch (error: any) {
    console.error("Update Profile Error:", error);
    return { success: false, message: "Profile update failed. Please try again." };
  }
};
