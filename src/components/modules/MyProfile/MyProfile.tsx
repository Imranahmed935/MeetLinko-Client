"use client";

import { UserInfo } from "@/types/user.interface";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserUpdateDialog } from "@/components/UserUpdateDialog";

interface MyProfileProps {
  userInfo: UserInfo;
}

const MyProfile = ({ userInfo }: MyProfileProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-6">
        <Avatar className="w-24 h-24">
          {userInfo.profileImage ? (
            <AvatarImage src={userInfo.profileImage} alt={userInfo.fullName} />
          ) : (
            <AvatarFallback className="text-3xl">
              {userInfo.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{userInfo.fullName}</h1>
          <p className="text-gray-500">{userInfo.email}</p>
          <p className="text-sm mt-1 capitalize text-gray-600">
            {userInfo.role}
          </p>
        </div>

        <UserUpdateDialog userInfo={ userInfo }/>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow rounded-lg p-6">
        <div>
          <h2 className="font-semibold text-gray-700">Bio</h2>
          <p className="text-gray-600 mt-1">{userInfo.bio || "N/A"}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Current Location</h2>
          <p className="text-gray-600 mt-1">
            {userInfo.currentLocation || "N/A"}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Travel Interests</h2>
          <p className="text-gray-600 mt-1">
            {userInfo.travelInterests.length > 0
              ? userInfo.travelInterests.join(", ")
              : "N/A"}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Visited Countries</h2>
          <p className="text-gray-600 mt-1">
            {userInfo.visitedCountries.length > 0
              ? userInfo.visitedCountries.join(", ")
              : "N/A"}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Subscription Active</h2>
          <p className="text-gray-600 mt-1">
            {userInfo.subscriptionActive ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Subscription Expires</h2>
          <p className="text-gray-600 mt-1">
            {userInfo.subscriptionExpiresAt
              ? new Date(userInfo.subscriptionExpiresAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Account Status</h2>
          <p className="text-gray-600 mt-1">{userInfo.userStatus}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700">Verified</h2>
          <p className="text-gray-600 mt-1">
            {userInfo.verified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
