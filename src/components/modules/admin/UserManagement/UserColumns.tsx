"use client";

import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { UserInfo } from "@/types/user.interface";

export const UserColumns: Column<UserInfo>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={user.fullName}
        email={user.email}
        photo={user.profileImage}
      />
    ),
  },

  {
    header: "Address",
    accessor: (user) => (
      <div className="flex flex-wrap gap-1">
        {user.currentLocation || "N/A"}
      </div>
    ),
  },

  {
    header: "Verified",
    accessor: (user) => {
      const isVerified = user.verified;
      const bgColor = isVerified ? "bg-green-500" : "bg-red-500";

      return (
        <div
          className={`text-white text-sm px-2 py-1 rounded-full text-center inline-block ${bgColor}`}
        >
          {isVerified ? "Verified" : "Not Verified"}
        </div>
      );
    },
  },

  {
    header: "Verified",
    accessor: (user) => (
      <div>{user.verified ? "Verified" : "Not Verified"}</div>
    ),
  },

  {
    header: "Status",
    accessor: (user) => {
      let bgColor = "";
      switch (user.userStatus) {
        case "ACTIVE":
          bgColor = "bg-green-500";
          break;
        case "INACTIVE":
          bgColor = "bg-red-500";
          break;
        case "BANNED":
          bgColor = "bg-yellow-500";
          break;
        case "PENDING":
          bgColor = "bg-blue-500";
          break;
        case "DELETED":
          bgColor = "bg-gray-500";
          break;
        default:
          bgColor = "bg-gray-400";
      }

      return (
        <div
          className={`text-white text-sm px-2 py-1 rounded-full text-center inline-block ${bgColor}`}
        >
          {user.userStatus}
        </div>
      );
    },
  },
];
