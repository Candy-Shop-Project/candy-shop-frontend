"use client";

import React, { useCallback, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Page() {
  const [clientSecret, setClientSecret] = useState(null);

  const fetchClientSecret = useCallback(async () => {
    // retrive product ids from localStorage
    const cartKeys = JSON.parse(localStorage.getItem("cart_keys") || "[]");

    if (cartKeys.length > 0) {
      try {
        // Fetch product data from Django backend using the product IDs
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/shop/get_multiple_products/`,
          {
            ids: cartKeys,
          }
        );

        const priceIds = response.data.map((item: any) => item.price_id); // Extract price IDs from response

        // create checkout session using price ids
        const res = await fetch("/api/payments/checkout_sessions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds: priceIds }), // Send the price IDs to your API route
        });

        const data = await res.json();
        return data.clientSecret;
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    } else {
      console.error("No items in the cart.");
      return null;
    }
  }, []);

  const options = { fetchClientSecret };

  return (
    <div id="checkout" className="pt-20">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
