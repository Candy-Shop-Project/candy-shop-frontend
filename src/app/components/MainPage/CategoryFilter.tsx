import React, { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "@/app/components/MainPage/constants/categories";
import { BiCategory } from "react-icons/bi";
import { FaRegWindowClose } from "react-icons/fa";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const [isOpen, setIsOpen] = useState(false); // isOpen state for mobile dropdown

  // toggle menu visibility on mobile
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="w-full flex flex-col items-center mb-6 relative">
      {/* menu toggle button for mobile devices */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-full"
          aria-label="Toggle categories"
        >
          {isOpen ? <FaRegWindowClose size={35} /> : <BiCategory size={35} />}
        </button>
      </div>

      {/* category filter menu (displayed as horizontal on large screens, dropdown on mobile) */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } lg:flex flex-wrap justify-center items-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-lg`}
      >
        {categories.map((category) => (
          <motion.button
            key={category.value}
            onClick={() => onSelectCategory(category.value)}
            className={`px-4 py-2 m-1 rounded-full transition duration-200 ${
              selectedCategory === category.value
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
