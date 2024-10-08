// auth/login

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    //parse request body
    const { username, password } = (await request.json()) as {
      username: string;
      password: string;
    };

    //make request to django to create refresh and access token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/jwt/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // includes username and password to body of post request to backend
      }
    );

    if (response.ok) {
      const data = (await response.json()) as {
        access: string;
        refresh: string;
      };

      //if response is ok
      const res = NextResponse.json({ message: "Login successful" });

      //sets httpOnly cookies for access and refresh tokens, to prevent attacks like XSS(cookies are not accessible through js)
      res.cookies.set("access", data.access, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      res.cookies.set("refresh", data.refresh, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      return res; // returns message that login was successful
    } else {
      const errorData = (await response.json()) as {
        non_field_errors?: string[]; // if there was error
      };
      return NextResponse.json(
        { message: errorData.non_field_errors?.[0] || "Invalid credentials" }, //returns invalid credentials message
        { status: 401 } // return 401 unauthorized status
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 }); // return 500 if there was some server error
  }
}
