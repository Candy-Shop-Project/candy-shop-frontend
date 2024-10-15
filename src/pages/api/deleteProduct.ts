import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";

export default async function deleteProductHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const cookies = parse(req.headers.cookie || "");
    const accessToken = cookies.access;

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { productId } = req.query;

    if (!productId) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }

    // request to backend with access token in auth header
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/delete_product/${productId}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      res.status(204).end(); // no content response if successful
    } else {
      let errorData;
      try {
        errorData = await response.json();
      } catch (err) {
        errorData = { message: "Unexpected error" };
      }
      res.status(response.status).json(errorData);
    }
  } catch (error) {
    console.error(`Error deleting product:`, error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
