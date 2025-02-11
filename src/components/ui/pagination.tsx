import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];

    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (startPage > 1) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      pageNumbers.push('...');
    }

    return pageNumbers;
  };

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center space-x-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="btn btn-sm bg-gray-600"
      >
        prev
      </button>

      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <button key={index} disabled className="btn btn-sm bg-gray-600">
              ...
            </button>
          );
        }

        return (
          <button
            key={page}
            onClick={() => onPageChange(Number(page))}
            className="btn btn-sm bg-gray-300 "
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="btn btn-sm bg-gray-600"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
