export function DiffStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-separator p-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
