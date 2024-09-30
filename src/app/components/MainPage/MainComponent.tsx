"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link"; // for navigation to individual store page
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination"; // Import the Pagination component

// type definitions
interface ShopItem {
  id: number; // for products/[id]/page.tsx navigation(individual product menu)
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
  const [currentPage, setCurrentPage] = useState<number>(1); // state to track the current page
  const itemsPerPage = 12; // number of items per page

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

  // calculate pagination values
  const totalPages = Math.ceil(shopItems.length / itemsPerPage); // calculates total pages displayed in ui

  // contains only items for the current page, rendered by ui
  const displayedItems = shopItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Shop Items</h2>

      {/* always render CategoryFilter, even when user selects category he wants */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={(category: string | null) =>
          setSelectedCategory(category)
        }
      />

      {/* conditional rendering for loading, error, and product display */}
      <div className="min-h-screen flex flex-col justify-center items-center">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center text-red-500 font-semibold py-8">
            {error}
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {displayedItems.map((item) => (
                <li
                  key={item.id}
                  className="group relative block overflow-hidden border border-gray-100 bg-white rounded-lg"
                  style={{ height: "450px" }} // Set a fixed height for the card
                >
                  {/* wishlist button */}
                  <button className="absolute right-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
                    <span className="sr-only">Wishlist</span>
                    {/* wishlist icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 3.643 9.623 2.517 7.688 2.517 5.099 2.517 3 4.532 3 7.017c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  </button>

                  {/* product image */}
                  <Link href={`/products/${item.id}`}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </Link>

                  {/* product details */}
                  <div className="p-4 flex flex-col justify-between h-[calc(100%-192px)]">
                    {/* product info */}
                    <div>
                      {/* new badge(use when needed and implement logic) */}
                      {/* <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium inline-block">
                        New
                      </span> */}

                      {/* product name */}
                      <Link href={`/products/${item.id}`}>
                        <h3 className="mt-4 text-lg font-medium text-gray-900 line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>

                      {/* product description */}
                      <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                        {item.description}
                      </p>

                      {/* product price */}
                      <p className="mt-2 text-lg font-bold text-gray-900">
                        ${item.price}
                      </p>
                    </div>

                    {/* add to cart button */}
                    <div className="mt-4">
                      <button className="block w-full rounded bg-yellow-400 py-2 text-sm font-medium transition hover:scale-105">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* pagination component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)} // callback function passed to children
            />
          </>
        )}
      </div>
    </div>
  );
};

// simple loading spinner component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
  </div>
);

export default MainComponent;
