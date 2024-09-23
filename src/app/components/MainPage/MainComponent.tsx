"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryFilter from "./CategoryFilter";

// type
interface ShopItem {
  name: string;
  description: string;
  price: number;
  image_url: string;
}

// main component to display and filter products
const MainComponent: React.FC = () => {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]); // store fetched data
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // manage selected category for filtering
  const [loading, setLoading] = useState<boolean>(true); // loading during data fetch
  const [error, setError] = useState<string | null>(null); // state to handle errors

  // function to fetch products based on the selected category
  const fetchProducts = async (category?: string) => {
    try {
      setLoading(true); // set loading state before fetching data
      setError(null); // reset error state before new API call

      const url = category
        ? `http://127.0.0.1:8000/shop/products/?category=${category}` // query with category filter
        : "http://127.0.0.1:8000/shop/products/"; // query all products

      const response = await axios.get(url); // fetch data from backend
      setShopItems(response.data); // set state with response data
    } catch (err) {
      setError("Error loading products. Please try again later."); // error message if fetch fails
    } finally {
      setLoading(false); // reset loading state after data fetched
    }
  };

  // fetch products whenever selectedCategory changes
  useEffect(() => {
    fetchProducts(selectedCategory || undefined);
  }, [selectedCategory]);

  // loading spinner if data is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  // render error message if error occurred
  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold py-8">{error}</div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Shop Items</h2>
      {/* category filter component embedded in main component */}
      <CategoryFilter // props to children
        selectedCategory={selectedCategory}
        onSelectCategory={(category: any) => setSelectedCategory(category)} // passed callback function to children component
      />
      {/* display shop items based on selected category */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {shopItems.map((item) => (
          <li
            key={item.name}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-lg font-bold text-blue-500 mb-4">
                ${item.price}
              </p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainComponent;
