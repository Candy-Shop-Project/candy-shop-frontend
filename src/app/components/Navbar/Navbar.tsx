"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Searchbar from "./components/Searchbar";
import SearchbarPhone from "./components/SearchbarPhone";

import Cart from "../Cart/Cart";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              CandyShop
            </Link>
          </div>

          {/* navigation links */}
          <div className="hidden md:block">
            <ul className="flex space-x-4 ml-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* search bar component*/}
          <Searchbar />

          <div className="flex items-center space-x-4">
            {/* cart component */}
            <Cart />

            {/* mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* mobile nav menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden pb-5"
            >
              <ul className="px-2 pt-2 pb-3 space-y-1">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shop"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              {/* Insert mobileMenuSearchbar here */}
              <SearchbarPhone />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
