import type { LabeledValue } from "@/types";

interface BarListProps {
  items: LabeledValue[];
  formatValue: (value: number) => string;
  formatLabel?: (label: string) => string;
  max?: number;
}

export function BarList({ items, formatValue, formatLabel = (label) => label, max }: BarListProps) {
  if (items.length === 0) return <p className="text-sm text-muted">Sin datos registrados todavía.</p>;
  const ceiling = max ?? Math.max(...items.map((item) => item.value), 1);

  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="min-w-0 truncate">{formatLabel(item.label)}</span>
            <span className="shrink-0 font-mono text-xs text-muted">{formatValue(item.value)}</span>
          </div>
          <div
            role="meter"
            aria-label={formatLabel(item.label)}
            aria-valuenow={item.value}
            aria-valuemin={0}
            aria-valuemax={ceiling}
            className="h-2 overflow-hidden rounded-full bg-surface-tertiary"
          >
            <div
              className="h-full rounded-full bg-danger"
              style={{ width: `${Math.min(100, (item.value / ceiling) * 100)}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
