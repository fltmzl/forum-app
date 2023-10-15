import { NextRequest, NextResponse } from "next/server";
import api from "./utils/api";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  let user = null;
  if (accessToken) {
    user = await api.verifyAccessToken(accessToken);
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    if (user) return NextResponse.redirect(new URL("/", request.url));
  }

  // eslint-disable-next-line no-shadow
  const shouldRedirectToLogin = (pathname: string, user: any) => {
    return (pathname === "/" || pathname.startsWith("/threads") || pathname.startsWith("/new") || pathname.startsWith("leaderboards")) && !user;
  };

  if (shouldRedirectToLogin(pathname, user)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
