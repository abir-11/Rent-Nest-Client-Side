import { NextRequest, NextResponse } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { jwtUtils } from "./utils/jwt";
import { getNewRefreshToken } from "./service/refreshToken";

const AUTH_ROUTES = ["/login", "/register"];

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/properties",
  "/contact",
  "/login",
  "/register",
  "/data/Home.json"
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let decodedAccessToken = accessToken
    ? jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      )
    : null;

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifyToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null;

  const response = NextResponse.next();

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    try {
      const result = await getNewRefreshToken();

      const newAccessToken = result?.accessToken;

      if (newAccessToken) {
        response.cookies.set("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 60 * 60 * 24,
        });

        accessToken = newAccessToken;

        decodedAccessToken = jwtUtils.verifyToken(
          newAccessToken,
          process.env.JWT_ACCESS_SECRET as string
        );
      }
    } catch (error) {
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
  }

  if (!decodedAccessToken?.success) {
    response.cookies.delete("accessToken");
  }

  let userRole: string | null = null;

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role;
  }


  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "ADMIN") {
      return NextResponse.redirect(
        new URL("/dashboard/admin", request.url)
      );
    }

    if (userRole === "LANDLORD") {
      return NextResponse.redirect(
        new URL("/dashboard/landlord", request.url)
      );
    }

    if (userRole === "TENANT") {
      return NextResponse.redirect(
        new URL("/dashboard/tenant", request.url)
      );
    }

    return NextResponse.redirect(new URL("/", request.url));
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) =>
      pathname === route || pathname.startsWith(route + "/")
  );

  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    pathname.startsWith("/dashboard/admin") &&
    userRole !== "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (
    pathname.startsWith("/dashboard/landlord") &&
    userRole !== "LANDLORD"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  if (
    pathname.startsWith("/dashboard/tenant") &&
    userRole !== "TENANT"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|mp4|webm|mov|avi|mkv)$).*)",
  ],
};