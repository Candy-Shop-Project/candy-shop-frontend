"use client";

import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number | string;
  image_url: string;
}

interface CartShowProps {
  onClose: () => void;
}

// callback function prop
function CartShow({ onClose }: CartShowProps) {
  const [data, setData] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // check if localStorage is available
    if (typeof window !== "undefined") {
      // fetch added item ids from localStorage
      const cartKeys = localStorage.getItem("cart_keys");

      if (cartKeys) {
        // parse json string into an array
        const idsArray: number[] = JSON.parse(cartKeys);

        // make sure idsArray is array and has at least one id
        if (Array.isArray(idsArray) && idsArray.length > 0) {
          // fetch item details from backend
          axios
            .post("http://127.0.0.1:8000/shop/get_multiple_products/", {
              ids: idsArray, // body of request with ids array
            })
            .then((response) => {
              // update state with fetched data from api
              const products = response.data.map((item: Product) => {
                // ensure price is a number
                const price = parseFloat(item.price as string);
                return {
                  ...item,
                  price: isNaN(price) ? 0 : price,
                };
              });
              setData(products);

              // calculate total price
              const total = products.reduce(
                (sum: number, item: Product) => sum + (item.price as number),
                0
              );
              setTotalPrice(total);
            })
            .catch((error) => {
              console.error("Error fetching cart items:", error);
            });
        } else {
          console.log("Cart is empty.");
        }
      } else {
        console.log("No cart data found in localStorage.");
      }
    }
  }, []);

  // function to remove item from cart
  function removeItemFromCart(itemId: number) {
    // check if localStorage is available
    if (typeof window !== "undefined") {
      // fetch added item ids from localStorage
      const cartKeys = localStorage.getItem("cart_keys");

      if (cartKeys) {
        // parse json string into an array
        let idsArray: number[] = JSON.parse(cartKeys);

        // remove the item id from the array
        idsArray = idsArray.filter((id: number) => id !== itemId);

        // update localStorage with new array
        localStorage.setItem("cart_keys", JSON.stringify(idsArray));

        // update the component state
        const newData = data.filter((item) => item.id !== itemId);
        setData(newData);

        // recalculate total price
        const total = newData.reduce(
          (sum: number, item: Product) => sum + (item.price as number),
          0
        );
        setTotalPrice(total);
      }
    }
  }

  return (
    <div className="fixed inset-0 flex z-50">
      {/* overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* cart side menu */}
      <div className="relative ml-auto w-full sm:w-96 bg-white shadow-xl transform transition-transform duration-300 translate-x-0">
        {/* close button */}
        <button
          className="absolute top-0 right-0 mt-4 mr-4 text-2xl font-semibold focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>

        {/* cart content */}
        <div className="flex flex-col h-full">
          {/* cart header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold">Your Cart</h2>
          </div>

          {/* cart items using map */}
          <div className="p-4 overflow-y-auto flex-grow">
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="flex mb-4">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-20 h-20 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantity: 1</p>
                    <p className="text-gray-800 font-semibold">
                      {/* ${item.price.toFixed(2)} */}$
                      {Number(item.price).toFixed(2)}
                    </p>
                  </div>
                  {/* remove item button */}
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {/* cart footer */}
          <div className="p-4 border-t">
            <h3 className="text-lg font-semibold mb-4">
              Total: ${totalPrice.toFixed(2)}
            </h3>
            <button className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartShow;
