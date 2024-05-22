import { useState } from "react";

export function usePagination(data, itemsPerPage = 10) {
  const [currentPage, setCurrentPage] = useState(1);
  const sliceData = data.slice(
    itemsPerPage * currentPage - itemsPerPage,
    itemsPerPage * currentPage
  );

  let numbers = [];
  let totalPages = Math.ceil(data.length / itemsPerPage);

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
  } else {
    if (currentPage === 1) numbers = [1, 2, "...", totalPages];
    else if (currentPage === 2) numbers = [1, 2, 3, "...", totalPages];
    else if (currentPage === 3) numbers = [1, 2, 3, 4, "...", totalPages];
    else if (currentPage > 3 && currentPage === totalPages - 2)
      numbers = [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    else if (currentPage > 2 && currentPage === totalPages - 1)
      numbers = [1, "...", totalPages - 2, totalPages - 1, totalPages];
    else if (currentPage === totalPages)
      numbers = [1, "...", totalPages - 1, totalPages];
    else
      numbers = [
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      ];
  }

  function goToPage(page) {
    setCurrentPage(page);
  }

  return { sliceData, currentPage, numbers, totalPages, goToPage };
}
