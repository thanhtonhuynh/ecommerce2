import {
  DEFAULT_LOGIN_REDIRECT,
  // apiAuthPrefix,
  apiPrefix,
  authRoutes,
  publicRoutes,
  adminRoutesPrefix,
} from "@/routes";

import { auth } from "@/auth";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "ADMIN";

  // const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiRoutes = nextUrl.pathname.startsWith(apiPrefix);
  const isPublicRoute =
    publicRoutes.includes(nextUrl.pathname) ||
    nextUrl.pathname.startsWith("/product/");
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutesPrefix);

  // if (isApiAuthRoutes) return;
  if (isApiRoutes) return;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/login", nextUrl));
  }

  if (isAdminRoute && !isAdmin) {
    const url = new URL(DEFAULT_LOGIN_REDIRECT, nextUrl);
    url.searchParams.set("error", "unauthorized");
    return Response.redirect(url);
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
