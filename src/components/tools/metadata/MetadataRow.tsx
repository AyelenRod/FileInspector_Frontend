import type { ReactNode } from "react";

interface MetadataRowProps {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

export function MetadataRow({ icon, label, value }: MetadataRowProps) {
  return (
    <div className="flex items-start gap-3 border-b border-separator py-3 last:border-0">
      <span className="mt-0.5 text-muted">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <p className="break-words font-medium">{value ?? "—"}</p>
      </div>
    </div>
  );
}
