import { Info, TriangleAlert } from "lucide-react";
import { formatNumber } from "@/lib/format";

export function SizeMismatchNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
      <TriangleAlert className="size-5 shrink-0 text-warning" aria-hidden />
      <p>
        <strong>Los archivos tienen tamaños distintos.</strong> Se comparan hasta el final del más corto; los bytes
        restantes cuentan como diferencia.
      </p>
    </div>
  );
}

export function TruncatedDiffNotice({ shown }: { shown: number }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-separator bg-surface p-4 text-xs text-muted">
      <Info className="size-4 shrink-0" aria-hidden />
      Mostrando las primeras {formatNumber(shown)} diferencias en la tabla interactiva.
    </div>
  );
}
