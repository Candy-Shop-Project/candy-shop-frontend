//cart icon component

// import Link from "next/link";
import { useState } from "react";
import CartShow from "./CartShow";

function Cart() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative text-gray-600 hover:text-gray-800"
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8h12l-2-8M9 21a2 2 0 100-4 2 2 0 000 4z"
        />
      </svg>
      {/* item Count Badge */}
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
        3
      </span>
      {isOpen ? <CartShow /> : ""}
    </div>
  );
}

export default Cart;
