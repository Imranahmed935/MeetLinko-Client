
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



  // Optional: handle pagination if your API returns meta info
  // const totalPages = Math.ceil(planResult.meta.total / planResult.meta.limit);

  return (
    <div className="space-y-6">
      <PlanManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search plans..." />
        <RefreshButton />
      </div>

      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
        <PlanTable plans={planResult.data} />
        {/* Optional Pagination */}
        {/* <TablePagination
          currentPage={planResult.meta.page}
          totalPages={totalPages}
        /> */}
      </Suspense>
    </div>
  );
};

export default AllPlanPage;
