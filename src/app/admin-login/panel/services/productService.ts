// define helper functions here for easier use and reusability
// transfer also url verification function here for reason described above later

import axios from "axios";

// update product function
export const updateProduct = async (productId: number, updatedData: any) => {
  try {
    const response = await axios.patch(
      `/api/updateProduct?productId=${productId}`, // pages/api/updateProduct.tsx
      updatedData
    );
    return response.data; // return updated product from the server
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Error updating product");
  }
};

// delete product function
export const deleteProduct = async (productId: number) => {
  try {
    await axios.delete(`/api/deleteProduct?productId=${productId}`);
  } catch (error: any) {
    console.log(error);
  }
};
