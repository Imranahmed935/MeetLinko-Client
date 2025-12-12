"use server";

import { serverFetch } from "@/lib/server-fetch";

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  try {
    const res = await serverFetch.post(`/auth/change-password`, {
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: {
        "Content-Type": "application/json", 
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return {
        success: false,
        message: errorData?.message || "Failed to update password",
      };
    }

    const data = await res.json();

    return {
      success: true,
      message: data.message || "Password updated successfully!",
    };
  } catch (error) {
    console.error("Password update error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
