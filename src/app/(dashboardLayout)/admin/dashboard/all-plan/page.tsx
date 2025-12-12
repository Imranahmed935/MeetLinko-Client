
import PlanManagementHeader from "@/components/modules/admin/PlanManagement/PlanManagementHeader";
import PlanTable from "@/components/modules/admin/PlanManagement/PlanTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllTravelPlans } from "@/services/admin/allPlan";


import { Suspense } from "react";

const AllPlanPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const planResult = await getAllTravelPlans();

  return (
    <div className="space-y-6">
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
      <PlanManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search plans..." />
        <RefreshButton />
      </div>

        <PlanTable plans={planResult.data} />
      </Suspense>
    </div>
  );
};

export default AllPlanPage;
