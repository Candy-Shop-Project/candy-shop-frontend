// reusable item added component
// provide parent state in props with ItemAdded component
// if you want, you can adjust message and icon also by passing something new to props from parent

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAppDispatch } from "../../../../store";
import { toggleCart } from "../../../../store/slices/cartSlice"; // redux

interface ItemAddedProps {
  showNotification: boolean;
  message?: string;
  icon?: React.ReactNode;
}

const ItemAdded: React.FC<ItemAddedProps> = ({
  showNotification, // parent state
  message = "Item was added to your cart", // default message
  icon = <span className="text-2xl">✅</span>, // default icon
}) => {
  const dispatch = useAppDispatch(); // dipatch redux

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-md shadow-lg z-50 flex items-center space-x-2 sm:bottom-6 sm:right-6 sm:px-6 sm:py-4 sm:rounded-lg sm:space-x-3"
        >
          {icon}
          <span className="font-medium text-sm sm:text-base">{message}</span>
          <button
            className="underline text-white font-semibold hover:text-green-300 transition-colors duration-200 text-sm sm:text-base ml-2 sm:ml-4"
            onClick={() => dispatch(toggleCart())}
          >
            Go to cart
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemAdded;
