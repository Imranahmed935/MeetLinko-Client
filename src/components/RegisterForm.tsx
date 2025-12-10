"use client";

import { registerUser } from "@/services/auth/registerUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(registerUser, null);

  console.log(state)

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl mb-6">Create Your Account</h1>
        <form
          action={formAction}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <Field>
                <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                <Input id="fullName" name="fullName" type="text" placeholder="John Doe" />
                <InputFieldError field="fullName" state={state} />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input id="email" name="email" type="email" placeholder="john@example.com" />
                <InputFieldError field="email" state={state} />
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input id="password" name="password" type="password" />
                <InputFieldError field="password" state={state} />
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <Input id="confirmPassword" name="confirmPassword" type="password" />
                <InputFieldError field="confirmPassword" state={state} />
              </Field>

              {/* Current Location */}
              <Field>
                <FieldLabel htmlFor="currentLocation">Current Location</FieldLabel>
                <Input id="currentLocation" name="currentLocation" type="text" placeholder="Dhaka, Bangladesh" />
                <InputFieldError field="currentLocation" state={state} />
              </Field>

              {/* Travel Interests */}
              <Field>
                <FieldLabel htmlFor="travelInterests">Travel Interests</FieldLabel>
                <Input
                  id="travelInterests"
                  name="travelInterests"
                  type="text"
                  placeholder="mountains, camping, cycling"
                />
                <InputFieldError field="travelInterests" state={state} />
              </Field>

              {/* Visited Countries */}
              <Field>
                <FieldLabel htmlFor="visitedCountries">Visited Countries</FieldLabel>
                <Input
                  id="visitedCountries"
                  name="visitedCountries"
                  type="text"
                  placeholder="Bangladesh, Malaysia"
                />
                <InputFieldError field="visitedCountries" state={state} />
              </Field>

              {/* Role */}
              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <select id="role" name="role" className="border rounded px-3 py-2 w-full">
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
                <InputFieldError field="role" state={state} />
              </Field>

              {/* Profile Image */}
              <Field className="md:col-span-2">
                <FieldLabel htmlFor="file">Profile Image (optional)</FieldLabel>
                <Input id="file" name="file" type="file" accept="image/*" />
              </Field>
            </div>

            <FieldGroup className="mt-6">
              <Field className="md:col-span-2">
                <Button type="submit" disabled={isPending} className="w-full">
                  {isPending ? "Creating Account..." : "Create Account"}
                </Button>
                <FieldDescription className="px-6 text-center mt-2">
                  Already have an account?{" "}
                  <a href="/login" className="text-blue-600 hover:underline">
                    Sign in
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
