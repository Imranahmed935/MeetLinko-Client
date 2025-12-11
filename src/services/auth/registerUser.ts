/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { userValidationSchema } from "@/zod/auth.validation";
import { loginUser } from "./loginUser";

export const registerUser = async (_currentState: any, formData: any) => {
  try {
    const payload = {
      fullName: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      currentLocation: formData.get("currentLocation") as string,
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

    const validatedPayload = validation.data;

    const newFormData = new FormData();
    newFormData.append("user", JSON.stringify(validatedPayload));

    console.log(newFormData);

    const file = formData.get("file");
    if (file && file.size > 0) {
      newFormData.append("file", file);
    }

    const res = await serverFetch.post("/user/register", {
      body: newFormData,
    });

    const result = await res.json();

    console.log(result)

    if (result.success) {
      await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    
    if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
    return {
      success: false,
      message: error.message || "Registration Failed. Please try again.",
    };
  }
};
