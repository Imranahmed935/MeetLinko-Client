"use client";

import ManagementTable from "@/components/shared/ManagementTable";
import { TTravelPlan } from "@/types/travelPlan.interface";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmaionDialog"; 
import { PlanColumns } from "./PlanColumns";
import PlanViewDialogDetail from "./PlanVeiwDialogDetail";
import { getDeletePlan } from "@/services/admin/allPlan";
 

interface PlanTableProps {
  plans: TTravelPlan[];
}

const PlanTable = ({ plans }: PlanTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingPlan, setDeletingPlan] = useState<TTravelPlan | null>(null);
  const [viewingPlan, setViewingPlan] = useState<TTravelPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (plan: TTravelPlan) => {
    setViewingPlan(plan);
  };

  const handleDelete = (plan: TTravelPlan) => {
    setDeletingPlan(plan);
  };

  const confirmDelete = async () => {
    if (!deletingPlan) return;

    setIsDeleting(true);

    const result = await getDeletePlan(deletingPlan.id); 

    setIsDeleting(false);

    if (result?.success) {
      toast.success(result.message || "Plan deleted successfully");
      setDeletingPlan(null);
      handleRefresh();
    } else {
      toast.error(result?.message || "Failed to delete plan");
    }
  };

  return (
    <>
      <ManagementTable
        data={plans}
        columns={PlanColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(plan) => plan.id!}
        emptyMessage="No travel plans found"
      />

      {/* View Plan Detail Dialog */}
      <PlanViewDialogDetail
        open={!!viewingPlan}
        onClose={() => setViewingPlan(null)}
        plan={viewingPlan}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingPlan}
        onOpenChange={(open) => !open && setDeletingPlan(null)}
        onConfirm={confirmDelete}
        title="Delete Travel Plan"
        description={`Are you sure you want to delete the travel plan to ${deletingPlan?.destination}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default PlanTable;
