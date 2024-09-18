"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteProduct, updateProduct } from "../services/productService"; // Import the service functions
import axios from "axios";

export default function ListProducts() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false); // state to control success toast visibility
  const [showErrorToast, setShowErrorToast] = useState(false); // state to control error toast visibility
  const [showDeleteConfirmDialog, setShowDeleteConfirmDialog] = useState(false); // show delete confirmation dialog
  const [showUpdateConfirmDialog, setShowUpdateConfirmDialog] = useState(false); // show update confirmation dialog
  const [productToDelete, setProductToDelete] = useState<any>(null); // state to track product selected for deletion
  const [productToUpdate, setProductToUpdate] = useState<any>(null); // state to track product selected for update
  const [updatedData, setUpdatedData] = useState<any>({
    // state to hold updated product data for updateConfirmDialog
    // default empty value for each key-value pair
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/shop/products/"
        );
        setData(response.data);
      } catch (error) {
        setError("Error fetching products");
        setShowErrorToast(true);
        setTimeout(() => setShowErrorToast(false), 3000);
      }
    };

    fetchData(); // async function to fetch data from backend
  }, []);

  // function to show confirmation dialog
  const confirmDelete = (productId: any) => {
    setProductToDelete(productId); // set state to track id of product
    setShowDeleteConfirmDialog(true); // show confirmation dialog
  };

  // function to handle confirmed delete action
  const handleDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete); // use imported function from services/productServic to delete product
      setData(data.filter((product) => product.id !== productToDelete));
      setSuccessMessage("Product deleted successfully"); //state to set success message
      setShowSuccessToast(true); // show success toast
      setTimeout(() => setShowSuccessToast(false), 3000); //clear success message after 3 seconds
    } catch (error) {
      // error handling
      setError("Error deleting product");
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000); // clear error message  after 3 seconds
    } finally {
      setShowDeleteConfirmDialog(false); // hide delete confirmation dialog after user selec
      setProductToDelete(null); // reset productToDelete state to null
    }
  };

  // show update confirmation dialog
  const confirmUpdate = (product: any) => {
    setProductToUpdate(product); // set the selected product to be updated
    setUpdatedData({
      name: product.name, // pre fill product name
      description: product.description, // pre-fill product description
      price: product.price, // pre-fill product price
      image_url: product.image_url, // pre-fill product image URL
    });
    setShowUpdateConfirmDialog(true); // show update confirmation dialog
  };

  // handle update action
  const handleUpdate = async () => {
    if (!productToUpdate) return; // return if no product is selected
    try {
      const updatedProduct = await updateProduct(
        productToUpdate.id, // pass the product id to be updated
        updatedData // pass the updated product data (check updateProduct funtion in services folder)
      );
      setData(
        data.map(
          (product) =>
            product.id === updatedProduct.id ? updatedProduct : product // update product in local data array
        )
      );
      setSuccessMessage("Product updated successfully"); // show success message
      setShowSuccessToast(true); // show success toast
      setTimeout(() => setShowSuccessToast(false), 3000); // hide success toast after 3 seconds
      console.log(updatedProduct); // for !testing! log updatedProduct to console
    } catch (error) {
      // error handling
      setError("Error updating product");
      setShowErrorToast(true); // trigger error toast
      setTimeout(() => setShowErrorToast(false), 3000);
    } finally {
      setShowUpdateConfirmDialog(false); // close update confirmation dialog
      setProductToUpdate(null); // reset product to update state
    }
  };

  // handle input changes for update dialog
  const handleInputChange = (e: any) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value }); // update form state with input values
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
                  onClick={() => confirmUpdate(product)} // calls confirmUpdate function
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
        <div className="flex justify-center items-center h-24">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}

      {/* success toast */}
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

      {/* error toast */}
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

      {/* delete confirmation dialog with framer motion */}
      <AnimatePresence>
        {showDeleteConfirmDialog && productToDelete && (
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
                  onClick={() => setShowDeleteConfirmDialog(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* update confirmation dialog */}
      <AnimatePresence>
        {showUpdateConfirmDialog && productToUpdate && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Update this product
              </h3>

              {/* display Product Image */}
              <div className="flex justify-center mb-4">
                <img
                  src={updatedData.image_url}
                  alt={updatedData.name}
                  className="w-48 h-48 object-cover rounded"
                />
              </div>

              {/* product name */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                  placeholder="Product Name"
                />
              </div>

              {/* product description */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={updatedData.description}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full h-24"
                  placeholder="Product Description"
                />
              </div>

              {/* product price */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={updatedData.price}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full"
                  placeholder="Product Price"
                />
              </div>

              {/* product image url */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Image URL
                </label>
                <textarea
                  name="image_url"
                  value={updatedData.image_url}
                  onChange={handleInputChange}
                  className="p-3 border rounded w-full h-16"
                  placeholder="Product Image URL"
                />
              </div>

              {/* confirmation buttons */}
              <div className="flex justify-between">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => setShowUpdateConfirmDialog(false)}
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
