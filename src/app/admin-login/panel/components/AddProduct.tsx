// admin panel
"use client";
import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [productName, setProductName] = useState(""); // product name
  const [description, setDescription] = useState(""); // product description
  const [price, setPrice] = useState(""); // product price
  const [imageUrl, setImageUrl] = useState(""); // product image cdn (url)
  const [errorMessage, setErrorMessage] = useState(""); // error message
  const [successMessage, setSuccessMessage] = useState(""); // success message
  const [isSubmitting, setIsSubmitting] = useState(false); // state to disable button when during form submission

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

    // uses isValidUrl helper function to check if url entered by user is correct
    if (!isValidUrl(imageUrl)) {
      setErrorMessage("Please enter a valid URL.");
      setSuccessMessage(""); //clears success message
      return;
    }

    setIsSubmitting(true); // disables button, until form submites(to prevent user repeatedly clicking on it)

    try {
      // change url later to env variable, if database url to add items will change
      await axios.post("http://127.0.0.1:8000/shop/add_product/", {
        name: productName,
        description: description,
        price: price,
        image_url: imageUrl,
      });
      setErrorMessage(""); // reset error message if submission was successful
      setSuccessMessage("Product added successfully!"); // set success message
      setProductName("");
      setDescription("");
      setPrice("");
      setImageUrl("");
    } catch (error: any) {
      console.log("Some error occurred: ");
      console.log(error); // logs error to browser console
      const errorMsg =
        "There was an error connecting to the database, please try again later"; // change to more user friendly(maybe)
      setErrorMessage(errorMsg);
      setSuccessMessage(""); // clear success message on error
    } finally {
      setIsSubmitting(false); // re enables button when request completes
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Add New Product
        </h2>
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-sm text-green-600">{successMessage}</div>
        )}
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
      </div>
    </div>
  );
}
