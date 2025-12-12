"use client";

import { Suspense, useEffect, useState } from "react";


import { TReview, TReview1 } from "@/types/review.interface";
import { getAllReviews } from "@/services/admin/allReview";
import ReviewTable from "@/components/modules/admin/ReviewManagement/ReviewTable";
import { TableSkeleton } from "@/components/shared/TableSkeleton";


const ReviewPage = () => {
 
  const [reviews, setReviews] = useState<TReview[]>([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const allReviews = await getAllReviews();
      setReviews(allReviews);
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  fetchData();
}, []);


  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reviews Management</h1>
      </div>

      <Suspense  fallback={<TableSkeleton columns={10} rows={10} />}>
        {reviews?.length === 0 ? (
        <p className="text-muted-foreground">You have not submitted any reviews yet.</p>
      ) : (
        <ReviewTable reviews={reviews} />
      )}
      </Suspense>
    </div>
  );
};

export default ReviewPage;
