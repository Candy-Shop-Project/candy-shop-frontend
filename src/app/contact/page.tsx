"use client";

import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle submit func
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:", formData); // for now just prints enteret data from user to console
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8 lg:p-12">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Get in Touch
        </h2>
        <p className="text-center text-gray-600 mb-8">
          If you have questions about your order or any other inquiries, please
          dont hesitate to contact us.
          <a
            href="https://github.com/TBud15"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline ml-1"
          >
            GitHub
          </a>
          .
        </p>

        <div className="text-center text-gray-600 mb-8">
          <p>
            Phone:{" "}
            <a
              href="tel:+11234567890"
              className="text-indigo-600 hover:underline"
            >
              +1 (123) 456-7890
            </a>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:support@candyshop.com"
              className="text-indigo-600 hover:underline"
            >
              support@candyshop.com
            </a>
          </p>
          <p>Address: 123 Lincoln Rd, Ft Lauderdale, FL 5938, USA</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md py-3 px-4 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Write your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md shadow-md hover:bg-indigo-700 transition duration-300 ease-in-out focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
