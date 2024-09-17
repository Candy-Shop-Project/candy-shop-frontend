import React from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="text-blue-600 text-3xl font-bold">C</div>
        <span className="text-xl font-semibold text-gray-900">Candy Shop</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <Link
          href="/"
          className="text-gray-700 hover:text-blue-600 font-medium"
        >
          Home
        </Link>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          Best Sellers
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          By Brand
        </a>
        <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">
          By Candy Type
        </a>
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-6">
        {/* Search Icon */}
        <FaSearch
          className="text-gray-700 hover:text-blue-600 cursor-pointer"
          size={18}
        />

        {/* Shopping Cart Icon with Badge */}
        <div className="relative">
          <FaShoppingCart
            className="text-gray-700 hover:text-blue-600 cursor-pointer"
            size={18}
          />
          <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
