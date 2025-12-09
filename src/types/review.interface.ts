import { TTravelPlan } from "./travelPlan.interface";
import { UserInfo } from "./user.interface";

export interface TReview {
  id: string;
  rating: number;
  comment: string;

  reviewerId: string;
  reviewer: UserInfo;

  travelPlanId: string;
  travelPlan: TTravelPlan;

  createdAt: Date;
  updatedAt: Date;
}
