import React from "react";

export default function Instructions() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* stripe price_id instructions */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-indigo-600">
          Price ID Instructions (Stripe)
        </h2>
        <ol className="list-decimal list-inside text-gray-800 space-y-4">
          <li>
            Navigate to the{" "}
            <span className="font-semibold">Stripe Dashboard</span> and add your
            product to the{" "}
            <span className="font-semibold">Product Catalog</span> section.
          </li>
          <li>
            Click <span className="font-semibold">Create product</span> and fill
            out the product name (description is optional). Upload a product
            image in one of the formats: JPEG, PNG, or WEBP under 2MB. You can
            download it locally from your image URL and upload it to stripe.
          </li>
          <li>
            Select <span className="font-semibold">One-off</span> and fill in
            the amount in USD. Then, click <strong>Add product</strong>.
          </li>
          <li>
            Once the product is created, go to the created product, copy the{" "}
            <span className="font-semibold">Price ID </span>
            from the events section. Look for{" "}
            <strong>A new price called price_... was created.</strong> Click on
            it and copy the id: price_... from the provided object.
          </li>
          <li>
            Paste the copied <span className="font-semibold">Price ID</span>{" "}
            into the <span className="font-semibold">Price ID </span>
            input field in the form on this page.
          </li>
        </ol>
      </div>

      {/* image url instructions */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-2 text-indigo-600">
          Image URL Instructions
        </h2>
        <ol className="list-decimal list-inside text-gray-800 space-y-4">
          <li>
            You should have a valid image URL from a CDN. Take the image URL for
            the particular product and paste it into the Image URL field.
          </li>
          <li>
            Click on the Add product button after you fill out all required
            fields. If the image URL is incorrect, it will display an error
            message stating{" "}
            <span className="text-red-600">
              Please enter a valid image URL.
            </span>
            Correct the URL and try again if this happens.
          </li>
        </ol>
      </div>

      {/* category instructions */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-8 border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600">
          Add Category Instructions
        </h2>
        <ol className="list-decimal list-inside text-gray-800 space-y-4">
          <li>Understand which category your product is related to.</li>
          <li>
            Select a category from the available options, it will be assigned to
            your product and displayed when users filter categories from the
            main page.
          </li>
        </ol>
      </div>
    </div>
  );
}
