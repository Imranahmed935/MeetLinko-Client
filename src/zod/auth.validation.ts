/* eslint-disable @typescript-eslint/no-explicit-any */

import z from "zod";

export const userValidationSchema = z
  .object({
    fullName: z.string().min(1, { message: "Full name is required" }),
    email: z.email({ message: "Valid email is required" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters long" })
      .max(100, { message: "Confirm password must be at most 100 characters long" }),

    travelInterests: z.array(z.string()).optional(),
    visitedCountries: z.array(z.string()).optional(),
    currentLocation: z.string().optional(),
    role: z.enum(["USER", "ADMIN"]).optional().default("USER"),
  })
  .refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


export const loginValidationZodSchema = z.object({
    email: z.email({
        message: "Email is required",
    }),
    password: z.string("Password is required").min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
});

