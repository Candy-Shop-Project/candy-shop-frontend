"use client";

import axios from "axios";
import { useState, useEffect } from "react";

export default function ListProducts() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/shop/products/"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching the products:", error);
      }
    };

    fetchData(); // async function to fetch data from backend
  }, []);

  // Placeholder function for delete action
  const handleDelete = async (productId: any) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/shop/delete_product/${productId}/`
      );
      setData(data.filter((product) => product.id != productId));
      setSuccessMessage("Product deleted successfully."); //state to set success message
      setError(""); // clear error if any

      //clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      console.log(`Product with ID: ${productId} was deleted.`);
    } catch (error) {
      console.log("Error during deletion command: ", error);
      setError("Error deleting product");
    }
  };

  // handle update of product via productId(functionality not added yet)
  const handleUpdate = (productId: any) => {
    console.log(`Update product with ID: ${productId}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">List of Products</h1>

      {/* success message(change it to more nice ui) */}
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 text-center">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {/* error message(change it to more nice ui) */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded shadow-md"
            >
              <span className="text-lg font-medium">{product.name}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdate(product.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">No products available</p>
      )}
    </div>
  );
}
