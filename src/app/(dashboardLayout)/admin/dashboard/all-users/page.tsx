
import UserManagementHeader from "@/components/modules/admin/UserManagement/UserManagementHeader";
import UserTable from "@/components/modules/admin/UserManagement/UserTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
// import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/admin/allUsers";



import { Suspense } from "react";

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
 
//   const queryString = await queryStringFormatter(searchParams); 
  const patientResult = await getAllUsers();
//   const totalPages = Math.ceil(
//     patientResult.meta.total / patientResult.meta.limit
//   );
  return (
    <div className="space-y-6">
      <UserManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search patients..." />
        
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>

        <UserTable users={patientResult.data}/>
        {/* <TablePagination
          currentPage={patientResult.meta.page}
          totalPages={totalPages}
        /> */}
      </Suspense>
    </div>
  );
};

export default UserManagementPage;