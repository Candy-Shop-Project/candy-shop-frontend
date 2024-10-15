import { NextApiRequest, NextApiResponse } from "next";

export default function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // clear access and refresh cookies, setting their expiry to a past date
    res.setHeader("Set-Cookie", [
      "access=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure;",
      "refresh=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure;",
    ]);

    // respond success
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(`Error during logout:`, error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
