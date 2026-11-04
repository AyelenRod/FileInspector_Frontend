import { Card, ProgressBar } from "@heroui/react";
import { formatBytes, formatNumber } from "@/lib/format";
import type { BinaryDiffResult } from "@/types";
import { DiffStat } from "./DiffStat";

export function DiffSummaryCard({ data }: { data: BinaryDiffResult }) {
  const maxSize = Math.max(data.size_a, data.size_b);
  const similarity = maxSize ? (data.matching_bytes / maxSize) * 100 : 100;

  return (
    <Card>
      <Card.Content className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">
            {data.identical
              ? "Los archivos son idénticos"
              : `Se encontraron ${formatNumber(data.total_differences)} diferencias`}
          </h2>
          {!data.identical && (
            <span className="rounded-full bg-danger/20 px-3 py-1 text-[11px] font-semibold uppercase text-danger">
              Discrepancia detectada
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <DiffStat label="Tamaño Archivo A" value={`${formatNumber(data.size_a)} bytes (${formatBytes(data.size_a)})`} />
          <DiffStat label="Tamaño Archivo B" value={`${formatNumber(data.size_b)} bytes (${formatBytes(data.size_b)})`} />
          <DiffStat label="Bytes coincidentes" value={`${formatNumber(data.matching_bytes)} / ${formatNumber(maxSize)}`} />
        </div>
        <ProgressBar aria-label="Tasa de integridad coincidente" value={similarity}>
          <div className="flex justify-between text-xs text-muted">
            <span>Tasa de integridad coincidente</span>
            <span>Similitud: {similarity.toFixed(1)} %</span>
          </div>
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      </Card.Content>
    </Card>
  );
}
