"use client";

import { Card } from "@heroui/react";
import { usePagination } from "@/hooks/usePagination";
import type { DiffRow } from "@/types";
import { DiffPagination } from "./DiffPagination";
import { DiffTable } from "./DiffTable";

const PAGE_SIZE = 25;

export function DiffOffsetsCard({ differences }: { differences: DiffRow[] }) {
  const pagination = usePagination(differences.length, PAGE_SIZE);
  const rows = differences.slice(pagination.start, pagination.end);

  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-base">Registro de offsets discrepantes</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        <DiffTable rows={rows} />
        <DiffPagination pagination={pagination} total={differences.length} />
      </Card.Content>
    </Card>
  );
}
