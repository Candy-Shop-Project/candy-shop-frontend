import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default async function updateProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    // parse cookies from request headers
    const cookies = parse(req.headers.cookie || "");
    const accessToken = cookies.access;

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { productId } = req.query;
    const updatedData = req.body;

    // make request to backend with access token in auth header
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/update_product/${productId}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (response.ok) {
      const data = await response.json();
      res.status(200).json(data); // success response
    } else {
      const errorData = await response.json();
      res.status(response.status).json(errorData);
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
