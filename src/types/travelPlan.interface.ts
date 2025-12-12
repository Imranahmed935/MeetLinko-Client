import { TReview } from "./review.interface";
import { UserInfo } from "./user.interface";

export interface TTravelPlan {
  interests: any;
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;

  travelType:
    | "ADVENTURE"
    | "BUSINESS"
    | "FAMILY"
    | "SOLO"
    | "FRIENDS"
    | "HONEYMOON"
    | "COUPLE";

  description?: string | null;
  visibility: boolean;

  hostId: string;
  host: UserInfo;

  participants: UserInfo[];
  reviews: TReview[];

  createdAt: Date;
  updatedAt: Date;
}
