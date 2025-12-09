"use client";


import ManagementTable from "@/components/shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import MyPlanViewDetailDialog from "./MyPlanViewDetailDialog";
import MyPlanFormDialog from "./MyPlanDialogForm";
import { MyPlanColumns } from "./MyPlanColumns";
import { TTravelPlan } from "@/types/travelPlan.interface";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmaionDialog";
import { deletePlan } from "@/services/user/myPlan";

interface MyPlanTableProps {
  plans: TTravelPlan[];
}

const MyPlanTable = ({ plans }: MyPlanTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deletingPlan, setDeletingPlan] = useState<TTravelPlan | null>(null);
  const [viewingPlan, setViewingPlan] = useState<TTravelPlan | null>(null);
  const [editingPlan, setEditingPlan] = useState<TTravelPlan | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (plan: TTravelPlan) => {
    setViewingPlan(plan);
  };

  const handleEdit = (plan: TTravelPlan) => {
    setEditingPlan(plan);
  };

  const handleDelete = (plan: TTravelPlan) => {
    setDeletingPlan(plan);
  };

  const confirmDelete = async () => {
    if (!deletingPlan?.id) return;

    setIsDeleting(true);
    const result = await deletePlan(deletingPlan.id);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Plan deleted successfully");
      setDeletingPlan(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete plan");
    }
  };

  return (
    <>
      <ManagementTable
        data={plans}
        columns={MyPlanColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(plan) => plan.id!}
        emptyMessage="No travel plans found"
      />

      {/* ✅ Edit Plan Form Dialog */}
      <MyPlanFormDialog
        open={!!editingPlan}
        onClose={() => setEditingPlan(null)}
        travelPlan={editingPlan}
        onSuccess={() => {
          setEditingPlan(null);
          handleRefresh();
        }}
      />

      {/* ✅ View Plan Detail Dialog */}
      <MyPlanViewDetailDialog
        open={!!viewingPlan}
        onClose={() => setViewingPlan(null)}
        travelPlan={viewingPlan}
      />

      {/* ✅ Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingPlan}
        onOpenChange={(open) => !open && setDeletingPlan(null)}
        onConfirm={confirmDelete}
        title="Delete Travel Plan"
        description={`Are you sure you want to delete "${deletingPlan?.title}"? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default MyPlanTable;
