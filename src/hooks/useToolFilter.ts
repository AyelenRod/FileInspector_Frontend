"use client";

import { useMemo, useState } from "react";
import { TOOLS } from "@/lib/tools";

export const CATEGORY_FILTERS = ["Todas", "Privacidad", "Integridad"] as const;

export type CategoryFilter = (typeof CATEGORY_FILTERS)[number];

export function useToolFilter() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<CategoryFilter>("Todas");

  const tools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter(
      (t) =>
        (filter === "Todas" || t.category === filter) &&
        (!q || `${t.title} ${t.description}`.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  return { tools, query, setQuery, filter, setFilter };
}
