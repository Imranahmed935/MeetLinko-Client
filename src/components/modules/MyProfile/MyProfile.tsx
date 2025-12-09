"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/formatters";
import { updateMyProfile } from "@/services/auth/updateProfile";
import { UserInfo } from "@/types/user.interface";
import { Camera, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateMyProfile(formData);
      if (result.success) {
        setSuccess(result.message);
        setPreviewImage(null);
        router.refresh();
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card className="flex flex-col lg:flex-row items-center p-6 gap-6">
        <Avatar className="h-32 w-32">
          {previewImage || userInfo.profileImage ? (
            <AvatarImage
              src={previewImage || (userInfo.profileImage as string)}
              alt={userInfo.fullName}
            />
          ) : (
            <AvatarFallback className="text-3xl">
              {getInitials(userInfo.fullName)}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl font-bold">{userInfo.fullName}</h1>
          <p className="text-muted-foreground">{userInfo.email}</p>
          <p className="text-sm mt-1 capitalize">{userInfo.role}</p>
        </div>

        <label
          htmlFor="file"
          className="relative bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <Camera className="h-5 w-5" />
          <Input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={isPending}
          />
        </label>
      </Card>

      {/* Personal Information Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500/10 text-green-600 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={userInfo.fullName}
                  required
                  disabled={isPending}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  disabled
                  className="bg-muted"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  name="bio"
                  defaultValue={userInfo.bio || ""}
                  disabled={isPending}
                />
              </div>

              {/* Current Location */}
              <div className="space-y-2">
                <Label htmlFor="currentLocation">Current Location</Label>
                <Input
                  id="currentLocation"
                  name="currentLocation"
                  defaultValue={userInfo.currentLocation || ""}
                  disabled={isPending}
                />
              </div>

              {/* Travel Interests */}
              <div className="space-y-2">
                <Label htmlFor="travelInterests">Travel Interests</Label>
                <Input
                  id="travelInterests"
                  name="travelInterests"
                  defaultValue={userInfo.travelInterests.join(", ")}
                  disabled={isPending}
                />
              </div>

              {/* Visited Countries */}
              <div className="space-y-2">
                <Label htmlFor="visitedCountries">Visited Countries</Label>
                <Input
                  id="visitedCountries"
                  name="visitedCountries"
                  defaultValue={userInfo.visitedCountries.join(", ")}
                  disabled={isPending}
                />
              </div>

              {/* Account Info */}
              <div className="space-y-2">
                <Label htmlFor="subscriptionActive">Subscription Active</Label>
                <Input
                  id="subscriptionActive"
                  value={userInfo.subscriptionActive ? "Yes" : "No"}
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subscriptionExpiresAt">Subscription Expires</Label>
                <Input
                  id="subscriptionExpiresAt"
                  value={
                    userInfo.subscriptionExpiresAt
                      ? new Date(userInfo.subscriptionExpiresAt)
                          .toISOString()
                          .split("T")[0]
                      : "N/A"
                  }
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userStatus">Account Status</Label>
                <Input id="userStatus" value={userInfo.userStatus} disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="verified">Verified</Label>
                <Input
                  id="verified"
                  value={userInfo.verified ? "Yes" : "No"}
                  disabled
                />
              </div>

              {/* Timestamps */}
              <div className="space-y-2 md:col-span-2">
                <Label>Joined At</Label>
                <Input
                  value={new Date(userInfo.createdAt).toLocaleDateString()}
                  disabled
                />
                <Label>Last Updated</Label>
                <Input
                  value={new Date(userInfo.updatedAt).toLocaleDateString()}
                  disabled
                />
              </div>
            </div>

            <Separator className="my-4" />

            {/* Save Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default MyProfile;
