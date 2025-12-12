"use client";

import { Column } from "@/components/shared/ManagementTable";
import { DateCell } from "@/components/shared/cell/DateCell";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { TReview} from "@/types/review.interface";


export const MyReviewColumns: Column<TReview>[] = [
  {
    header: "Reviewer",
    accessor: (review) => (
      <UserInfoCell
        name={review.reviewer.fullName}
        email={review.reviewer.email}
        photo={review.reviewer.profileImage || null}
      />
    ),
    sortKey: "reviewer",
  },
  {
    header: "Comment",
    accessor: (review) => <span>{review.comment}</span>,
    sortKey: "comment",
  },
  {
    header: "Rating",
    accessor: (review) => <span>{review.rating} ⭐</span>,
    sortKey: "rating",
  },
  {
    header: "Created At",
    accessor: (review) => <DateCell date={review.createdAt} />,
    sortKey: "createdAt",
  },
];


