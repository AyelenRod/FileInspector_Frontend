"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { ArrowRight, Search } from "lucide-react";
import { TOOLS } from "@/lib/tools";

const FILTERS = ["Todas", "Privacidad", "Integridad"] as const;

export function ToolGrid() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("Todas");

  const tools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter(
      (t) =>
        (filter === "Todas" || t.category === filter) &&
        (!q || `${t.title} ${t.description}`.toLowerCase().includes(q)),
    );
  }, [query, filter]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex w-full items-center gap-2 rounded-lg border border-separator bg-surface px-3 py-2 sm:max-w-xs">
          <Search className="size-4 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar herramienta…"
            aria-label="Buscar herramienta"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
        </label>
        <div className="flex gap-2" role="group" aria-label="Filtrar por categoría">
          {FILTERS.map((f) => (
            <Button
              key={f}
              size="sm"
              aria-pressed={filter === f}
              variant={filter === f ? "primary" : "secondary"}
              onPress={() => setFilter(f)}
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      {tools.length === 0 && <p className="py-10 text-center text-muted">No se encontraron herramientas.</p>}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Card key={tool.slug} className="h-full">
              <Card.Header className="flex-row items-start justify-between">
                <span className={`flex size-9 items-center justify-center rounded-lg ${tool.accent}`}>
                  <Icon className="size-4" aria-hidden />
                </span>
                <span className="rounded-md bg-default px-2 py-0.5 text-[10px] text-muted">{tool.category}</span>
              </Card.Header>
              <Card.Content>
                <Card.Title className="text-base">{tool.title}</Card.Title>
                <Card.Description className="mt-1">{tool.description}</Card.Description>
              </Card.Content>
              <Card.Footer>
                <Link
                  href={tool.href}
                  className="flex w-full items-center justify-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent-hover"
                >
                  Abrir herramienta <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </>
  );
}
