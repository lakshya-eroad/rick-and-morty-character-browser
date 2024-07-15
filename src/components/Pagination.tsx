import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  hasNextPage,
  hasPrevPage,
}) => {
  return (
    <div className="flex justify-between mt-4">
      <button
        className={`btn ${!hasPrevPage ? "btn-disabled" : "btn-primary"}`}
        onClick={() => setPage(page - 1)}
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <button
        className={`btn ${!hasNextPage ? "btn-disabled" : "btn-primary"}`}
        onClick={() => setPage(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
