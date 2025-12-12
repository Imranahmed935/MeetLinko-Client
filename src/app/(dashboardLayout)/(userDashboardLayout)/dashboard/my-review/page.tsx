"use client";

import { useEffect, useState } from "react";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import { TReview, TReview1 } from "@/types/review.interface";
import MyReviewTable from "@/components/modules/Reviews/MyReviewTable";
import MyReviewDialogForm from "@/components/modules/Reviews/MyReviewDialogForm";
import { getReviews } from "@/services/review/review";


const MyReviewPage = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [selectedReview, setSelectedReview] = useState<TReview1 | null>(null);
  const [formDialogOpen, setFormDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = await getUserInfo();
        setUser(u);

        const myReviews = await getReviews(u.id); 
        setReviews(myReviews.data || []);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchData();
  }, []);

 const handleEditReview = (review: TReview) => {
  const normalizedReview: TReview1 = {
    ...review,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
    reviewer: {
      ...review.reviewer,
      profileImage: review.reviewer.profileImage ?? undefined,
    },
  };
  setSelectedReview(normalizedReview);
  setFormDialogOpen(true);
};

  const handleFormSuccess = async () => {
    if (!user) return;
    const updatedReviews = await getReviews(user.id );
    setReviews(updatedReviews.data || []);
    setFormDialogOpen(false);
    setSelectedReview(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Reviews</h1>
      </div>

      {reviews.length === 0 ? (
        <p className="text-muted-foreground">You have not submitted any reviews yet.</p>
      ) : (
        <MyReviewTable reviews={reviews} onEdit={handleEditReview} />
      )}

      {/* Form Dialog */}
      {formDialogOpen && (
        <MyReviewDialogForm
          open={formDialogOpen}
          onClose={() => setFormDialogOpen(false)}
          onSuccess={handleFormSuccess}
          review={selectedReview}
        />
      )}
    </div>
  );
};

export default MyReviewPage;
