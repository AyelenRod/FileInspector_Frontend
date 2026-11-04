import { Button } from "@heroui/react";
import { formatNumber } from "@/lib/format";
import type { usePagination } from "@/hooks/usePagination";

type PaginationState = ReturnType<typeof usePagination>;

export function DiffPagination({ pagination, total }: { pagination: PaginationState; total: number }) {
  const { page, pageCount, start, end, isFirst, isLast, previous, next } = pagination;

  return (
    <div className="flex items-center justify-between text-xs text-muted">
      <span>
        Mostrando {start + 1} - {end} de {formatNumber(total)} diferencias
      </span>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="secondary" isDisabled={isFirst} onPress={previous}>Anterior</Button>
        <span>{page + 1} / {pageCount}</span>
        <Button size="sm" variant="secondary" isDisabled={isLast} onPress={next}>Siguiente</Button>
      </div>
    </div>
  );
}
