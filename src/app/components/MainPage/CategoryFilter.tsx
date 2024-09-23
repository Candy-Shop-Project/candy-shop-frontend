import React from "react";
import { motion } from "framer-motion";
import { categories } from "@/app/admin-login/panel/constants/categories"; //imports categories object used in multiple files, to change or add categories visit /constants/categories.ts file

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
