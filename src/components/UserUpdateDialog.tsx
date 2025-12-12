"use client";

import { useActionState, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Camera } from "lucide-react";
import { UserInfo } from "@/types/user.interface";
import { updateProfile } from "@/services/auth/updateProfile";



export function UserUpdateDialog({ userInfo }: { userInfo: UserInfo }) {
  const [state, action, isPending] = useActionState(updateProfile, null);
  

  const [previewImage, setPreviewImage] = useState<string | null>(
    userInfo.profileImage || null
  );

  const handleFilePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil className="w-4 h-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information and profile photo.
          </DialogDescription>
        </DialogHeader>

        <form
          action={action}
          className="space-y-4"
        >
          <input type="hidden" name="id" value={userInfo.id} />

          <div className="grid gap-6 mt-4">
            {/* Profile Image Upload + Preview */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20 border">
                <AvatarImage src={previewImage || ""} alt="Profile" />
                <AvatarFallback>IMG</AvatarFallback>
              </Avatar>

              <label className="cursor-pointer flex items-center gap-2 text-sm text-primary font-medium">
                <Camera className="w-4 h-4" />
                Change Photo

                <Input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleFilePreview}
                  className="hidden"
                />
              </label>
            </div>

            {/* Full Name */}
            <div className="grid gap-1">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                defaultValue={userInfo.fullName}
              />
            </div>

            {/* Email */}
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={userInfo.email}
              />
            </div>

            {/* Bio */}
            <div className="grid gap-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={3}
                defaultValue={userInfo.bio || ""}
              />
            </div>

            {/* Current Location */}
            <div className="grid gap-1">
              <Label htmlFor="currentLocation">Current Location</Label>
              <Input
                id="currentLocation"
                name="currentLocation"
                defaultValue={userInfo.currentLocation || ""}
              />
            </div>

            {/* Travel Interests */}
            <div className="grid gap-1">
              <Label htmlFor="travelInterests">Travel Interests</Label>
              <Input
                id="travelInterests"
                name="travelInterests"
                defaultValue={userInfo.travelInterests.join(", ")}
              />
            </div>

            {/* Visited Countries */}
            <div className="grid gap-1">
              <Label htmlFor="visitedCountries">Visited Countries</Label>
              <Input
                id="visitedCountries"
                name="visitedCountries"
                defaultValue={userInfo.visitedCountries.join(", ")}
              />
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
