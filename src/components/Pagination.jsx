import React, { useState } from 'react';
const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <div className="flex gap-2 mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`px-3 py-1 rounded-md border 
            ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-100"}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;