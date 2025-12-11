/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const updateProfile = async (_: any, formData: FormData) => {
  console.log("FORM ENTRIES:", Array.from(formData.entries()));

  const userId = formData.get("id")?.toString();
  if (!userId) {
    return { success: false, message: "User ID missing" };
  }

  const uploadFormData = new FormData();

  // Create the user object
  const userData: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (key !== "file" && key !== "id") {
      userData[key] = value;
    }
  });

  // Append JSON data as string
  uploadFormData.append("user", JSON.stringify(userData));

  // Append file if selected
  const file = formData.get("file");
  if (file instanceof File && file.size > 0) {
    uploadFormData.append("file", file);
  }

  const res = await serverFetch.patch(`/user/${userId}`, {
    body: uploadFormData, // NO JSON.stringify
  });

  return res.json();
};
