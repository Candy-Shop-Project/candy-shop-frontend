import React from "react";

//types
interface ShopItem {
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface FirstSectionProps {
  shopItems: ShopItem[];
}

const FirstSection: React.FC<FirstSectionProps> = ({ shopItems }) => {
  //conditional render if no shopItems(data fetch failed from util function)
  if (!shopItems || shopItems.length === 0) {
    return (
      <div className="text-center text-red-500 font-semibold py-8">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">Shop Items</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {shopItems.map((item) => (
          <li
            key={item.name}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={item.image_url}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <p className="text-lg font-bold text-blue-500 mb-4">
                ${item.price}
              </p>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                Add to Cart
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FirstSection;
