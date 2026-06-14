import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Calculate visible pages with ellipses
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  // If no items, don't show pagination
  if (totalItems === 0) return null;

  return (
    <div className="flex items-center justify-center sm:justify-between border border-gray-100 bg-white px-4 py-3 sm:px-6 mt-6 rounded-2xl shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold text-gray-900">{startItem}</span> to <span className="font-semibold text-gray-900">{endItem}</span> of <span className="font-semibold text-gray-900">{totalItems}</span> results
          </p>
        </div>
        <div className="flex justify-center w-full sm:w-auto overflow-x-auto">
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft size={20} aria-hidden="true" />
            </button>
            
            {visiblePages.map((page, index) => {
              if (page === '...') {
                return (
                  <span 
                    key={`ellipsis-${index}`} 
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
                  >
                    ...
                  </span>
                );
              }

              return (
                <button 
                  key={page}
                  onClick={() => onPageChange(page)}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 transition-colors ${
                    currentPage === page 
                      ? 'z-10 bg-[#257AFC] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#257AFC]' 
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button 
              onClick={() => onPageChange(currentPage + 1)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 transition-colors"
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
