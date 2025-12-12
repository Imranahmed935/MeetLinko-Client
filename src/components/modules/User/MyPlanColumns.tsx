
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
