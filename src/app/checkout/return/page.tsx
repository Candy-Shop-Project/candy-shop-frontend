"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SessionStatus =
  | "open"
  | "complete"
  | "expired"
  | "canceled"
  | "error"
  | null;

export default function Return() {
  const [status, setStatus] = useState<SessionStatus>(null);
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      console.error("No session ID found in the URL.");
      setStatus("error");
      return;
    }

    fetch(`/api/payments/checkout_sessions?session_id=${sessionId}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email || "");
      })
      .catch((error) => {
        console.error("Error fetching session status:", error);
        setStatus("error");
      });
  }, []);

  if (status === "open") {
    router.push("/"); // Redirect to the homepage if the payment is still open
    return null; // Avoid rendering any content while redirecting
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  if (status === "expired") {
    return (
      <section id="expired">
        <p>
          Your session has expired. Please try completing your purchase again.
        </p>
        <a href="/" className="btn btn-primary">
          Go back to the shop
        </a>
      </section>
    );
  }

  if (status === "canceled") {
    return (
      <section id="canceled">
        <p>Your payment was canceled. No charges were made to your account.</p>
        <a href="/" className="btn btn-primary">
          Return to shop
        </a>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section id="error">
        <p>
          There was an error processing your payment. Please contact support for
          assistance.
        </p>
        <a href="/" className="btn btn-primary">
          Go back to the shop
        </a>
      </section>
    );
  }

  return (
    <section id="loading">
      <p>Loading your order status...</p>
    </section>
  );
}
