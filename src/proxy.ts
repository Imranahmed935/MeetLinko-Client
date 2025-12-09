import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";

import { deleteCookie, getCookie } from "./services/auth/tokenHandlers";

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  /** ✅ Remove tokenRefreshed param if exists */
  const hasTokenRefreshedParam =
    request.nextUrl.searchParams.has("tokenRefreshed");

  if (hasTokenRefreshedParam) {
    const url = request.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  /** ✅ Read access token */
  const accessToken = (await getCookie("accessToken")) || null;

  let userRole: UserRole | null = null;

  /** ✅ Verify token safely */
  if (accessToken) {
    try {
      const verifiedToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string
      ) as JwtPayload;

      userRole = verifiedToken.role as UserRole;
    } catch (err) {
      // ❌ Invalid token → logout
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  /** ✅ Detect route owner (ADMIN / USER / null) */
  const routerOwner = getRouteOwner(pathname);

  /** ✅ Check if route is auth route (login/register) */
  const isAuth = isAuthRoute(pathname);

  /** ✅ Rule 1: Logged-in user should NOT access auth routes */
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  /** ✅ Rule 2: Public route → allow */
  if (routerOwner === null) {
    return NextResponse.next();
  }

  /** ✅ Rule 3: Protected route but NO token → redirect to login */
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /** ✅ Rule 4: Role-based protection */
  if (routerOwner === "ADMIN" || routerOwner === "USER") {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
