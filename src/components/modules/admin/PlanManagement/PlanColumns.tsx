"use client";

import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Column } from "@/components/shared/ManagementTable";
import { TTravelPlan } from "@/types/travelPlan.interface";

export const PlanColumns: Column<TTravelPlan>[] = [
  {
    header: "Host",
    accessor: (plan) => (
      <UserInfoCell
        name={plan.host.fullName}
        email={plan.host.email}
        photo={plan.host.profileImage}
      />
    ),
  },
  {
    header: "Host Verified",
    accessor: (plan) => {
      const isVerified = plan.host.verified;
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
    header: "Title",
    accessor: (plan) => (
      <div className="flex flex-wrap gap-1">{plan.title || "N/A"}</div>
    ),
  },

  {
    header: "Type",
    accessor: (plan) => (
      <div className="flex flex-wrap gap-1">{plan.travelType || "N/A"}</div>
    ),
  },
  {
    header: "Budget",
    accessor: (plan) => (
      <div className="flex flex-wrap gap-1">{plan.budget || "N/A"}</div>
    ),
  },
  {
    header: "Destination",
    accessor: (plan) => (
      <div className="flex flex-wrap gap-1">{plan.destination || "N/A"}</div>
    ),
  },

  {
    header: "Status",
    accessor: (plan) => {
      let bgColor = "";
      switch (plan.host.userStatus) {
        case "ACTIVE":
          bgColor = "bg-green-500";
          break;
        case "INACTIVE":
          bgColor = "bg-red-500";
          break;
        case "PENDING":
          bgColor = "bg-blue-500";
          break;
        default:
          bgColor = "bg-gray-400";
      }

      return (
        <div
          className={`text-white text-sm px-2 py-1 rounded-full text-center inline-block ${bgColor}`}
        >
          {plan.host.userStatus}
        </div>
      );
    },
  },
];
