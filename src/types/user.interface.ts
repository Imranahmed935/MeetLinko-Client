/* eslint-disable @typescript-eslint/no-explicit-any */
import { TTravelPlan } from "./travelPlan.interface";
import { TReview } from "./review.interface";

export interface UserInfo {
  user: any;
  admin:any
  id: string;
  fullName: string;
  email: string;
  password: string;

  profileImage?: string | null;
  bio?: string | null;

  travelInterests: string[];
  visitedCountries: string[];

  currentLocation?: string | null;

  userStatus: "ACTIVE" | "INACTIVE" | "DELETED" | "BANNED" | "PENDING";
  role: "USER" | "ADMIN";

  verified: boolean;

  travelPlans: TTravelPlan[];
  joinedPlans: TTravelPlan[];

  subscriptionActive: boolean;
  subscriptionExpiresAt?: Date | null;

  reviews: TReview[];

  createdAt: Date;
  updatedAt: Date;
}
