
import UserManagementHeader from "@/components/modules/admin/UserManagement/UserManagementHeader";
import UserTable from "@/components/modules/admin/UserManagement/UserTable";
import RefreshButton from "@/components/shared/RefreshButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getAllUsers } from "@/services/admin/allUsers";



import { Suspense } from "react";

const UserManagementPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const patientResult = await getAllUsers();
  return (
    <div className="space-y-6">
      <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
      <UserManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search patients..." />
        
        <RefreshButton />
      </div>
        <UserTable users={patientResult.data}/>
      </Suspense>
    </div>
  );
};

export default UserManagementPage;