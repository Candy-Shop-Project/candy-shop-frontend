// /products/[id]/page.tsx for individual product pages
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import InstagramIcon from "@/app/components/SocialButtons/InstagramIcon";

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
  // state to store product data
  const [product, setProduct] = useState<Product | null>(null);

  // extract id from params object
  const id = params.id;

  // fetch product data inside useEffect hook
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product data based on id
        const response = await axios.get(
          `http://127.0.0.1:8000/shop/individual_product/${id}/` // change to env variable later
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error); // handle error
      }
    };

    fetchProduct();
  }, [id]);

  // if product data is not yet loaded, display a loading indicator
  if (!product) {
    return <div>Loading...</div>;
  }

  // if product data is loaded, render ui
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={product.name}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={product.image_url}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {/* if decide to add brand to database */}
              {product.brand || ""}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {product.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center">
                {/* star rating */}
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
              {/* pass product.instagram as link to InstagramIcon component, add instagram to database */}
              <InstagramIcon
                link={product.instagram || "https://www.instagram.com/"}
              />
            </div>
            <p className="leading-relaxed">{product.description}</p>
            {/* line */}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                ${product.price}
              </span>
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
