/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getAllTestimonial } from "@/services/review/review";

const Stars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  return (
    <div className="flex justify-center mb-3">
      {Array.from({ length: totalStars })?.map((_, i) => (
        <span key={i} className={i < rating ? "text-yellow-500" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getAllTestimonial();
      setReviews(data);
    };
    fetchReviews();
  }, []);

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Testimonials</h2>

        {reviews?.length > 0 ? (
          <Marquee pauseOnHover gradient={false} speed={40}>
            {reviews.map((review: any) => (
              <div
                key={review.id}
                className="mx-5 w-80 p-6 rounded-xl shadow-lg bg-white 
                border border-gray-200 hover:shadow-2xl 
                transition-all duration-300"
              >
                {/* Content */}
                <div className="p-3">
                  
                  {/* ⭐ Rating */}
                  <Stars rating={review.rating || 5} />

                  {/* Comment */}
                  <p className="text-gray-700 italic text-sm leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Reviewer info */}
                  <div className="flex items-center justify-center gap-3 mt-5">
                    <Avatar className="h-12 w-12 border border-gray-300">
                      <AvatarImage
                        src={review.reviewer?.profileImage}
                        alt={review.reviewer?.fullName}
                      />
                      <AvatarFallback>
                        {review.reviewer?.fullName
                          ?.split(" ")
                          .map((n: string) => n[0])
                          .join("") || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <span className="font-semibold text-gray-900 text-lg">
                      {review.reviewer?.fullName || "Anonymous"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        ) : (
          <p>No testimonials found.</p>
        )}
      </div>
    </section>
  );
}
