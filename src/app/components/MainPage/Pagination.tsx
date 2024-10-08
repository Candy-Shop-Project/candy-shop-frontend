// main component child component

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// scroll to top
const scrollToTop = () => {
  window.scroll(0, 0);
};

const Pagination: React.FC<PaginationProps> = ({
  // receives props from MainComponent.tsx
  currentPage,
  totalPages,
  onPageChange, // callback function
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex justify-center mt-16 mb-8">
      <button
        onClick={() => {
          scrollToTop();
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1}
        className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => {
            scrollToTop();
            onPageChange(number);
          }}
          className={`px-3 py-1 mx-1 ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => {
          scrollToTop();
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
        className="px-3 py-1 mx-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
