"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ListProducts() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false); // state to control success toast visibility
  const [showErrorToast, setShowErrorToast] = useState(false); // state to control error toast visibility
  const [showConfirmDialog, setShowConfirmDialog] = useState(false); // state to control confirmation dialog visibility
  const [productToDelete, setProductToDelete] = useState<any>(null); // state to keep track of the product to delete

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

  // function to show confirmation dialog
  const confirmDelete = (productId: any) => {
    setProductToDelete(productId);
    setShowConfirmDialog(true); // show confirmation dialog
  };

  // function to handle confirmed delete action
  const handleDelete = async () => {
    if (!productToDelete) return; // check if product is selected for deletion

    try {
      await axios.delete(
        `http://127.0.0.1:8000/shop/delete_product/${productToDelete}/` // delete product using productToDelete state
      );
      setData(data.filter((product) => product.id !== productToDelete));
      setSuccessMessage("Product deleted successfully."); //state to set success message
      setShowSuccessToast(true); // show success toast
      setError(""); // clear error if any

      //clear success message after 3 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
        setSuccessMessage("");
      }, 3000);

      console.log(`Product with ID: ${productToDelete} was deleted.`);
    } catch (error) {
      console.log("Error during deletion command: ", error);
      setError("Error deleting product");
      setShowErrorToast(true); // show error toast

      // automatically hide the error toast after 3 seconds
      setTimeout(() => {
        setShowErrorToast(false);
        setError("");
      }, 3000);
    } finally {
      setShowConfirmDialog(false); // hide confirmation dialog after user select
      setProductToDelete(null); // reset productToDelete state to null
    }
  };

  // handle update of product via productId(functionality not added yet)
  const handleUpdate = (productId: any) => {
    console.log(`Update product with ID: ${productId}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg relative">
      <h1 className="text-2xl font-bold mb-4 text-center">List of Products</h1>

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
                  onClick={() => confirmDelete(product.id)}
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

      {/* success toast with framer motion */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3"
          >
            <span className="text-2xl">✅</span>
            <span className="font-medium">{successMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* error toast with framer motion */}
      <AnimatePresence>
        {showErrorToast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 bg-red-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3"
          >
            <span className="text-2xl">⚠️</span>
            <span className="font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confirmation dialog with framer motion */}
      <AnimatePresence>
        {showConfirmDialog && productToDelete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Are you sure you want to delete this product?
              </h3>
              {/* find the product object using productToDelete (id) */}
              {data.map(
                (product) =>
                  product.id === productToDelete && (
                    <div
                      key={product.id}
                      className="flex flex-col items-center mb-4"
                    >
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-64 h-64 object-cover rounded mb-2"
                      />
                      <p className="font-bold">{product.name}</p>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  )
              )}
              <div className="flex justify-between">
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={() => setShowConfirmDialog(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
