import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const adminToken = request.cookies.get("admin_token");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/admin/auth") ||
    request.nextUrl.pathname === "/admin/register";

  // If trying to access admin routes without being authenticated
  if (isAdminRoute && !isAuthRoute && !adminToken) {
    return NextResponse.redirect(new URL("/admin/auth/login", request.url));
  }

  // If trying to access auth routes while being authenticated
  if (isAuthRoute && adminToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
