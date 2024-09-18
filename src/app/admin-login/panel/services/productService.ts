// define helper functions here for easier use and reusability
// transfer also url verification function here for reason described above later

import axios from "axios";

// update product function
export const updateProduct = async (productId: number, updatedData: any) => {
  try {
    const response = await axios.patch(
      `http://127.0.0.1:8000/shop/update_product/${productId}/`, // change to url env
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
      `http://127.0.0.1:8000/shop/delete_product/${productId}/` // change to url env
    );
  } catch (error) {
    throw new Error("Error deleting product");
  }
};
