"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ManagementPageHeader from "@/components/shared/ManagementPageHeader";

const MyReviewManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      <ManagementPageHeader
        title="Reviews Management"
        description="Manage all reviews"
      />
    </>
  );
};

export default MyReviewManagementHeader;
