import { formatBytes } from "@/lib/format";

interface SizeSummaryProps {
  originalSize: number;
  cleanSize: number;
  bytesSaved: number;
  percentSaved: number;
}

export function SizeSummary({ originalSize, cleanSize, bytesSaved, percentSaved }: SizeSummaryProps) {
  return (
    <div className="flex items-center gap-3 text-xs">
      <span className="rounded-lg border border-separator px-3 py-1.5">Tamaño original: {formatBytes(originalSize)}</span>
      <span className="rounded-lg border border-separator px-3 py-1.5">Tamaño limpio: {formatBytes(cleanSize)}</span>
      <span className="rounded-lg bg-accent px-3 py-1.5 font-semibold text-accent-foreground">
        {bytesSaved >= 0 ? "Ahorro" : "Aumento"}: {formatBytes(Math.abs(bytesSaved))} · {Math.abs(percentSaved).toFixed(1)}%
      </span>
    </div>
  );
}
