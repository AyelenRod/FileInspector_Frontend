import type { LucideIcon } from "lucide-react";
import { Card } from "@heroui/react";

interface StatTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}

export function StatTile({ icon: Icon, label, value, hint }: StatTileProps) {
  return (
    <Card>
      <Card.Content className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-danger">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-muted">{label}</p>
          <p className="mt-1 font-heading text-2xl font-bold">{value}</p>
          {hint && <p className="mt-0.5 truncate text-xs text-muted">{hint}</p>}
        </div>
      </Card.Content>
    </Card>
  );
}
