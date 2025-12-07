import { UserRole } from "@/lib/auth-utils";


export interface UserInfo {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    UserStatus: "ACTIVE" | "INACTIVE" | "DELETED" | "BANNED" | "PENDING";
    createdAt: string;
    updatedAt: string;
}