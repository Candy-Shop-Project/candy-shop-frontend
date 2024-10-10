// /products/[id]/page.tsx for individual product pages
"use client";

// pt-16 md:pt-20

import React, { useState, useEffect } from "react";
import axios from "axios";
import InstagramIcon from "@/app/components/SocialButtons/InstagramIcon";
import { useAppDispatch } from "../../../../store"; // for dispatching redux actions
import { setCartCount } from "../../../../store/slices/cartSlice";
import ItemAdded from "@/app/components/notifications/itemAdded";
import { motion, AnimatePresence } from "framer-motion";
import { MdErrorOutline } from "react-icons/md"; // react icons

interface ProductPageProps {
  params: { id: string };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  brand?: string;
  rating?: number;
  reviews?: number;
  instagram?: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false); // already added item state
  const id = params.id;
  const dispatch = useAppDispatch(); // redux dispatch func

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/individual_product/${id}/` // change to env variable later
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = (id: number) => {
    let cartItems = JSON.parse(localStorage.getItem("cart_keys") || "[]");
    // if statement prevents duplicate entires to localStorage
    if (!cartItems.includes(id)) {
      cartItems.push(id); // add product id to cart array
      localStorage.setItem("cart_keys", JSON.stringify(cartItems)); // update local storage
      dispatch(setCartCount(cartItems.length)); // update redux state
      setShowNotification(true);

      setTimeout(() => {
        setShowNotification(false);
      }, 2000); // hide notification after 2 seconds
    } else if (cartItems.includes(id)) {
      setAlreadyAdded(true);

      setTimeout(() => {
        setAlreadyAdded(false);
      }, 4000); // hides already added notification after 4 seconds
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white pt-16 md:pt-20 pb-20 md:pb-96">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.name}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.image_url}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {product.brand || ""}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    fill={
                      index < (product.rating || 0) ? "currentColor" : "none"
                    }
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <span className="text-gray-600 ml-3">
                  {product.reviews || 0} Reviews
                </span>
              </span>
              <InstagramIcon
                link={product.instagram || "https://www.instagram.com/"}
              />
            </div>
            <p className="leading-relaxed">{product.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <button
                className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                onClick={() => addToCart(product.id)} // call addToCart func with product id
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* item added notification */}
      <ItemAdded showNotification={showNotification} />

      {/* item already added to cart */}
      <AnimatePresence>
        {alreadyAdded && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 bg-blue-700 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3"
          >
            {/* react icons error */}
            <MdErrorOutline size={24} />
            <span className="font-medium">
              This item is already added to your cart
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductPage;
