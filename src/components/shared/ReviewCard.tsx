import React from "react";
import { Star } from "lucide-react";
import { formatDateTime } from "@/lib/formatters";
import Image from "next/image";
import { TReview } from "@/types/review.interface";

export interface IReviewType {
  review: TReview;
}

const ReviewCard = ({ review }: IReviewType) => {
  const defaultProfileImage = "https://via.placeholder.com/150";

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition duration-200">
      
      {/* Reviewer info */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={review.reviewer.profileImage || defaultProfileImage}
          alt={`Profile image of ${review.reviewer.fullName}`}
          width={60}
          height={60}
          className="rounded-full object-cover border-2 border-indigo-500"
        />

        <div>
          <h2 className="font-semibold text-gray-900">
            {review.reviewer.fullName || "Anonymous"}
          </h2>
          <p className="text-xs text-gray-500">
            {formatDateTime(review.createdAt)}
          </p>
        </div>
      </div>

   
      <p className="text-gray-700 mb-3">
        {review.comment || "No comment provided."}
      </p>

    
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={18}
            className={
              index < review.rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewCard;
