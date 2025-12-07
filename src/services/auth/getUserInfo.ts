// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use server"


// // import { UserInfo } from "@/types/user.interface";
// import jwt, { JwtPayload } from "jsonwebtoken";

// import { serverFetch } from "@/lib/server-fetch";
// import { getCookie } from "./tokenHandlers";

// export const getUserInfo = async () => {
//     let userInfo = {};
//     try {

//         const response = await serverFetch.get("/auth/me", {
//             cache: "force-cache",
//             next: { tags: ["user-info"] }
//         })

//         const result = await response.json();

//         console.log(result)


//         if (result.success) {
//             const accessToken = await getCookie("accessToken");

//             if (!accessToken) {
//                 throw new Error("No access token found");
//             }

//             const verifiedToken = jwt.verify(accessToken, process.env.JWT_SECRET as string) as JwtPayload;

//             userInfo = {
//                 name: verifiedToken.name || "Unknown User",
//                 email: verifiedToken.email,
//                 role: verifiedToken.role,
//             }
//         }

//         userInfo = {
//             name: result.data.admin?.name || result.data.user?.name ,
//             ...result.data
//         };

// console.log(userInfo)

//         return userInfo;
//     } catch (error: any) {
//         console.log(error);
//         return {
//             id: "",
//             name: "Unknown User",
//             email: "",
//             role: "User",
//         };
//     }

// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { serverFetch } from "@/lib/server-fetch";
import { getCookie } from "./tokenHandlers";

export type TUserInfo = {
  id?: string;
  fullName: string;
  email?: string;
  role: string;
};

export const getUserInfo = async (): Promise<TUserInfo> => {
  let userInfo: TUserInfo = {
    fullName: "Unknown User",
    role: "User",
  };

  try {
    // Fetch user data from server
    const response = await serverFetch.get("/auth/me", {
      cache: "force-cache",
      next: { tags: ["user-info"] },
    });

    const result = await response.json();

    if (!result.success) {
      console.log("Failed to fetch user info:", result);
      return userInfo;
    }

 
    const accessToken = await getCookie("accessToken");
    let verifiedToken: JwtPayload | null = null;

    if (accessToken) {
      try {
        verifiedToken = jwt.verify(
          accessToken,
          process.env.JWT_SECRET as string
        ) as JwtPayload;
      } catch (err) {
        console.log("Token verification failed:", err);
      }
    }

   
    userInfo = {
      id: verifiedToken?.sub || result.data.admin?.id || result.data.user?.id || "",
      fullName:
        verifiedToken?.fullName ||
        result.data.admin?.fullName ||
        result.data.user?.fullName ||
        "Unknown User",
      email:
        verifiedToken?.email ||
        result.data.admin?.email ||
        result.data.user?.email ||
        "",
      role:
        (verifiedToken?.role as string) ||
        result.data.admin?.role ||
        result.data.user?.role ||
        "User",
    };

    return userInfo;
  } catch (error: any) {
    console.log("getUserInfo error:", error);
    return userInfo;
  }
};
