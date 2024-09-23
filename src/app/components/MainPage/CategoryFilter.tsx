import React from "react";
import { motion } from "framer-motion";

// types
interface CategoryFilterProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

// category filter component for filtering shop items
const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  // different categories with labels and values(add here, if new cattegories appear)
  const categories = [
    { label: "All", value: null },
    { label: "Cakes", value: "cake" },
    { label: "Cookies", value: "cookie" },
  ];

  return (
    <div className="flex justify-center items-center space-x-4 mb-6">
      {/* dynamically generated category buttons */}
      {categories.map((category) => (
        <motion.button
          key={category.value}
          onClick={() => onSelectCategory(category.value)} // set new state in MainComponent, using onSelection callback function from mainComponent
          className={`px-4 py-2 rounded-full transition duration-200 ${
            selectedCategory === category.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.label}
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;
