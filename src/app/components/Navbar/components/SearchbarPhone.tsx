"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

interface ShopItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

function SearchbarPhone() {
  const [value, setValue] = useState(""); // store input values
  const [data, setData] = useState<any[]>([]); // fetch data with request
  const [error, setError] = useState(""); // error state
  const [isFocused, setIsFocused] = useState(false); // focused state
  const wrapperRef = useRef<HTMLDivElement>(null);

  // handle fetch on icon click
  function handleSearchIconClick() {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/search_product/?search_product=${value}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  }

  // handle fetch on input change
  useEffect(() => {
    // prevent fetch requests if valus is less than 2
    if (value.trim().length > 2) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/search_product/?search_product=${value}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
  }, [value]);

  // handle clicks outside the component
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // if click is outside component
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false); // close dropdown
      }
    }

    // add event listener
    document.addEventListener("mousedown", handleClickOutside);
    // remove event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef}>
      <div className="relative">
        <input
          type="text"
          className="w-full border rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search products..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        {/* search icon button */}
        <button
          className="absolute right-3 top-0 mt-2 text-gray-600 focus:outline-none "
          onClick={handleSearchIconClick} // handle instant db query
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* gonna display only if user is focused on this input*/}
      {isFocused && data && data.length > 0 && (
        <div className="relative">
          <ul className="absolute left-0 top-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
            {data.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`}>
                <li className="p-4 hover:bg-gray-100 cursor-pointer border-b border-gray-200 last:border-b-0">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-600 truncate">
                    {item.description}
                  </p>
                  <p className="text-blue-600 font-bold mt-2">${item.price}</p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchbarPhone;
