import React from 'react';
import './Pagination.css';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">

      <button 
        className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        «
      </button>
      
      {pageNumbers.map(number => (
        <button 
          key={number}
          className={`page-item ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      
      <button 
        className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;