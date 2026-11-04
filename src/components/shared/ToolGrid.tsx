"use client";

import { useToolFilter } from "@/hooks/useToolFilter";
import { ToolCard } from "./ToolCard";
import { ToolFilters } from "./ToolFilters";

export function ToolGrid() {
  const { tools, query, setQuery, filter, setFilter } = useToolFilter();

  return (
    <>
      <ToolFilters query={query} onQueryChange={setQuery} filter={filter} onFilterChange={setFilter} />

      {tools.length === 0 && <p className="py-10 text-center text-muted">No se encontraron herramientas.</p>}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </>
  );
}
