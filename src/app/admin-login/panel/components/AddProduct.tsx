// admin panel
"use client";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../constants/addOrUpdateCategories";

export default function AddProduct() {
  const [productName, setProductName] = useState(""); // product name
  const [description, setDescription] = useState(""); // product description
  const [price, setPrice] = useState(""); // product price
  const [imageUrl, setImageUrl] = useState(""); // product image cdn (url)
  const [category, setCategory] = useState(""); // set product category
  const [errorMessage, setErrorMessage] = useState(""); // error message
  const [successMessage, setSuccessMessage] = useState(
    "Product added successfully!"
  ); // success message
  const [isSubmitting, setIsSubmitting] = useState(false); // state to disable button during form submission
  const [showToast, setShowToast] = useState(false); // state to control success toast visibility
  const [showErrorToast, setShowErrorToast] = useState(false); // state to control error toast visibility

  // checks if input url is valid
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // validate if category is selected
    if (!category) {
      setErrorMessage("Please select a category.");
      setShowErrorToast(true);
      setTimeout(() => {
        setShowErrorToast(false); // automatically hide error toast after 5 seconds
      }, 5000);
      return;
    }

    // uses isValidUrl helper function to check if url entered by user is correct
    if (!isValidUrl(imageUrl)) {
      setErrorMessage("Please enter a valid image URL."); // set specific error message for URL
      setShowErrorToast(true); // show error toast
      setTimeout(() => {
        setShowErrorToast(false); // Automatically hide error toast after 5 seconds
      }, 5000);
      return;
    }

    setIsSubmitting(true); // disables button, until form submits(to prevent user repeatedly clicking on it)

    try {
      // change url later to env variable, if database url to add items will change
      await axios.post("http://127.0.0.1:8000/shop/add_product/", {
        name: productName,
        description: description,
        price: price,
        image_url: imageUrl,
        category: category, // category state included
      });
      setShowErrorToast(false); // hide error toast if any
      setErrorMessage(""); // reset error message if submission was successful
      setSuccessMessage("Product added successfully!"); // set success message
      setShowToast(true); // show success toast
      setProductName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
      setCategory(""); // reset category after submission

      // hide success toast after 3 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error: any) {
      setErrorMessage(
        "There was an error adding the product to the database, please try again later."
      ); // set general error message
      setShowErrorToast(true); // show error toast
      setTimeout(() => {
        setShowErrorToast(false); // automatically hide error toast after 5 seconds
      }, 5000);
      console.log("Some error occurred: ", error); // logs error to browser console
    } finally {
      setIsSubmitting(false); // re enables button when request completes
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg relative">
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-3 mt-4 font-bold text-white bg-blue-500 rounded focus:outline-none focus:ring-4 focus:ring-blue-300 ${
            isSubmitting
              ? "bg-blue-300 cursor-not-allowed"
              : "hover:bg-blue-600"
          }`}
          disabled={isSubmitting} // disable button if submitting
        >
          {isSubmitting ? "Submitting..." : "Add Product"}
        </button>
      </form>

      {/* success toast with framer motion */}
      <AnimatePresence>
        {showToast && (
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
            <span className="font-medium">{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
