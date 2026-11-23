import type { ReactNode } from "react";
import { Card } from "@heroui/react";

interface MetricCardProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function MetricCard({ title, description, children }: MetricCardProps) {
  return (
    <Card>
      <Card.Content className="flex flex-col gap-5">
        <div>
          <h2 className="font-heading text-lg font-bold">{title}</h2>
          <p className="text-xs text-muted">{description}</p>
        </div>
        {children}
      </Card.Content>
    </Card>
  );
}
