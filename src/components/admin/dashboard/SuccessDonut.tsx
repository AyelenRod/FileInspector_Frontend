import { formatPercent } from "@/lib/admin-format";

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function SuccessDonut({ value }: { value: number }) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="relative size-32 shrink-0" role="img" aria-label={`Tasa de éxito global ${formatPercent(clamped)}`}>
      <svg viewBox="0 0 128 128" className="size-full -rotate-90">
        <circle cx="64" cy="64" r={RADIUS} fill="none" strokeWidth="12" className="stroke-surface-tertiary" />
        <circle
          cx="64"
          cy="64"
          r={RADIUS}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          className="stroke-danger"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE * (1 - clamped / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-heading text-xl font-bold">
        {formatPercent(clamped)}
      </span>
    </div>
  );
}
