import AllMyReview from "@/components/shared/AllMyReview";
import { Suspense } from "react";

const MyReviewPage = () => {
  return (
    <Suspense>
      <AllMyReview/>
    </Suspense>
  );
};

export default MyReviewPage;
