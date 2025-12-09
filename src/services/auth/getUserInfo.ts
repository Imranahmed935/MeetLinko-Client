/* eslint-disable @typescript-eslint/no-explicit-any */

"use server"


import { UserInfo } from "@/types/user.interface";
import jwt, { JwtPayload } from "jsonwebtoken";

import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "./tokenHandlers";

export const getUserInfo = async (): Promise<UserInfo | any> => {
    let userInfo: UserInfo | any;
    try {
        const response = await serverFetch.get("/auth/me", {
            cache: "force-cache",
            next: { tags: ["user-info"] }
        })

        const result = await response.json();

        if (result.success) {
            const accessToken = await getCookie("accessToken");

            if (!accessToken) {
                throw new Error("No access token found");
            }

            const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

            userInfo = {
                name: verifiedToken.fullName || "Unknown User",
                email: verifiedToken.email,
                role: verifiedToken.role,
            }
        }

        userInfo = {
            name: result.data.admin?.fullName || result.data.user?.fullName || result.data.name || "Unknown User",
            ...result.data
        };



        return userInfo;
    } catch (error: any) {
        return {
            id: "",
            name: "Unknown User",
            email: "",
            role: "GUEST",
        };
    }

}