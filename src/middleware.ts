// MIDDLEWARE

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessTokenCookie = request.cookies.get("access");
  const refreshTokenCookie = request.cookies.get("refresh");

  if (!accessTokenCookie) {
    // if user doesn't have access token, redirect to admin login page right away
    return NextResponse.redirect(new URL("/admin-login", request.url));
  }

  const accessToken = accessTokenCookie.value; // token value extracted

  // calls verifyAccessToken function, which calls django backend(djoser) endpoint to verify current user access token
  const isValid = await verifyAccessToken(accessToken);

  if (isValid) {
    // if token is valid, proceed to next middleware or route handler
    return NextResponse.next();
  } else {
    // if token is invalid, check if refresh token is available
    if (!refreshTokenCookie) {
      // if no refresh token, redirect to admin login page
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }

    const refreshToken = refreshTokenCookie.value; // extract refresh token value

    // attempt to refresh access token using Django backend refresh endpoint
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/jwt/refresh/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }), // sending the refresh token to backend
        }
      );

      if (response.ok) {
        // if the response is OK, get the new access token from response JSON
        const data = await response.json();
        const newAccessToken = data.access;

        // create a new response
        const res = NextResponse.next();

        // set the new access token in cookies
        res.cookies.set("access", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        // proceed with the request
        return res;
      } else {
        // if refresh failed, redirect to login page without deleting cookies
        console.log("Refresh token invalid or expired");
        return NextResponse.redirect(new URL("/admin-login", request.url));
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      // redirect to login on error without deleting cookies
      return NextResponse.redirect(new URL("/admin-login", request.url));
    }
  }
}

// verifies current user access token with django backend (this is hoisted function)
async function verifyAccessToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/jwt/verify/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    return response.ok; // return true if token verification is valid
  } catch (error) {
    console.error("Token verification failed:", error);
    return false; // return false if token verification fails
  }
}

export const config = {
  matcher: ["/admin-login/panel/:path*"], // add protected routes
};
