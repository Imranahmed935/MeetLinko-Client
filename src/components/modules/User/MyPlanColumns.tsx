// "use client";
// import { DateCell } from "@/components/shared/cell/DateCell";
// import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
// import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
// import { Column } from "@/components/shared/ManagementTable";
// import { TTravelPlan } from "@/types/travelPlan.interface";


// export const MyPlanColumns: Column<TTravelPlan>[] = [
//   {
//     header: "Admin",
//     accessor: (admin) => (
//       <UserInfoCell
//         name={admin.name}
//         email={admin.email}
//         photo={admin.profilePhoto}
//       />
//     ),
//     sortKey: "name",
//   },
//   {
//     header: "Contact",
//     accessor: (admin) => (
//       <div className="flex flex-col">
//         <span className="text-sm">{admin.contactNumber}</span>
//       </div>
//     ),
//   },
//   {
//     header: "Status",
//     accessor: (admin) => <StatusBadgeCell isDeleted={admin.isDeleted} />,
//   },
//   {
//     header: "Joined",
//     accessor: (admin) => <DateCell date={admin.createdAt} />,
//     sortKey: "createdAt",
//   },
// ];

"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/ManagementTable";
import { TTravelPlan } from "@/types/travelPlan.interface";

export const MyPlanColumns: Column<TTravelPlan>[] = [
  
  {
    header: "Plan Title",
    accessor: (plan) => <span>{plan.title}</span>,
    sortKey: "title",
  },

  {
    header: "Destination",
    accessor: (plan) => <span>{plan.destination}</span>,
    sortKey: "destination",
  },

  {
    header: "Type",
    accessor: (plan) => <span>{plan.travelType}</span>,
    sortKey: "type",
  },
  {
    header: "Budget",
    accessor: (plan) => <span>{plan.budget}</span>,
    sortKey: "budget",
  },
  {
    header: "Created At",
    accessor: (plan) => <DateCell date={plan.createdAt} />,
    sortKey: "createdAt",
  },
];
