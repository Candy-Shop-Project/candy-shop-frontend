// reusable item added component
// provide parent state in props with ItemAdded component
// if you want, you can adjust message and icon also by passing something new to props from parent

import { motion, AnimatePresence } from "framer-motion";

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
  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-3"
        >
          {icon}
          <span className="font-medium">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItemAdded;
