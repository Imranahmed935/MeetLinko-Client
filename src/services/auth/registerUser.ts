/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

import { loginUser } from "./loginUser";
import { userValidationSchema } from "@/zod/auth.validation";

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const payload = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      bio: formData.get("bio") as string | undefined,
      currentLocation: formData.get("currentLocation") as string | undefined,
      role: (formData.get("role") as string) || "USER",
      travelInterests: ((formData.get("travelInterests") as string) || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      visitedCountries: ((formData.get("visitedCountries") as string) || "")
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    };

    const validation = zodValidator(payload, userValidationSchema);
    if (!validation.success) return validation;

    const validatedPayload: any = validation.data;

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/user/register", {
      body: newFormData,
    });

    const result = await res.json();

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again.",
    };
  }
};

