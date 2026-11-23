"use client";

import { Button } from "@heroui/react";
import { Search } from "lucide-react";
import { CATEGORY_FILTERS, type CategoryFilter } from "@/hooks/useToolFilter";

interface ToolFiltersProps {
  query: string;
  onQueryChange: (query: string) => void;
  filter: CategoryFilter;
  onFilterChange: (filter: CategoryFilter) => void;
}

export function ToolFilters({ query, onQueryChange, filter, onFilterChange }: ToolFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <label className="flex w-full items-center gap-2 rounded-lg border border-separator bg-surface px-3 py-2 sm:max-w-xs">
        <Search className="size-4 text-muted" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar herramienta…"
          aria-label="Buscar herramienta"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
        />
      </label>
      <div className="flex gap-2" role="group" aria-label="Filtrar por categoría">
        {CATEGORY_FILTERS.map((f) => (
          <Button
            key={f}
            size="sm"
            aria-pressed={filter === f}
            variant={filter === f ? "primary" : "secondary"}
            onPress={() => onFilterChange(f)}
          >
            {f}
          </Button>
        ))}
      </div>
    </div>
  );
}
