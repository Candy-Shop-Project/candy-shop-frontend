// define helper functions here for easier use and reusability
// transfer also url verification function here for reason described above later

import axios from "axios";

// update product function
export const updateProduct = async (productId: number, updatedData: any) => {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/update_product/${productId}/`, // change to url env
      updatedData
    );
    return response.data; // return updated product from the server
  } catch (error) {
    throw new Error("Error updating product");
  }
};

// delete product function
export const deleteProduct = async (productId: number) => {
  try {
    await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/delete_product/${productId}/` // change to url env
    );
  } catch (error) {
    throw new Error("Error deleting product");
  }
};
