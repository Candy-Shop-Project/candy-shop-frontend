"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Searchbar from "./components/Searchbar";
import SearchbarPhone from "./components/SearchbarPhone";
import Cart from "../Cart/Cart";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarScrolled, setIsNavbarScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // update state based on scroll position
      setIsNavbarScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md ${
        isNavbarScrolled ? "h-12" : "h-16"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between ${
            isNavbarScrolled ? "h-12" : "h-16"
          }`}
        >
          {/* logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              CandyShop
            </Link>
          </div>

          {/* nav links */}
          <div className="hidden md:block">
            <ul className="flex space-x-4 ml-4">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
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

          {/* search bar */}
          {/* if scrolled down it wont show */}
          {!isNavbarScrolled && <Searchbar />}

          {/* cart menu button */}
          <div className="flex items-center space-x-4">
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
            <ul className="px-2 pt-2 pb-3 space-y-1 bg-white">
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
                  href="/about-us"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <SearchbarPhone />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
