"use client";

import { useState } from "react";

export function usePagination(totalItems: number, pageSize: number) {
  const [page, setPage] = useState(0);
  const pageCount = Math.max(1, Math.ceil(totalItems / pageSize));

  return {
    page,
    pageCount,
    start: page * pageSize,
    end: Math.min((page + 1) * pageSize, totalItems),
    isFirst: page === 0,
    isLast: page >= pageCount - 1,
    previous: () => setPage((p) => p - 1),
    next: () => setPage((p) => p + 1),
  };
}
