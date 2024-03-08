import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, paginate }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="flex flex-wrap justify-center space-x-2 items-center">
        <li>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1} 
            className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          >
            Prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className="list-none">
            <button onClick={() => paginate(number)} className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200">
              {number}
            </button>
          </li>
        ))}
        <li>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            className="px-4 py-2 border rounded hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};