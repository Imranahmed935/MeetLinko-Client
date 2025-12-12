"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import { TReview, TReview1 } from "@/types/review.interface";
import MyReviewTable from "@/components/modules/Reviews/MyReviewTable";
import MyReviewDialogForm from "@/components/modules/Reviews/MyReviewDialogForm";
import { getReviews } from "@/services/review/review";
import { getAllReviews } from "@/services/admin/allReview";
import ReviewTable from "@/components/modules/admin/ReviewManagement/ReviewTable";


const ReviewPage = () => {
 
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<TReview1 | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  console.log(reviews)

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

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">You have not submitted any reviews yet.</p>
      ) : (
        <ReviewTable reviews={reviews} />
      )}
    </div>
  );
};

export default ReviewPage;
