import Link from "next/link";
import { Card } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import type { ToolInfo } from "@/lib/tools";

export function ToolCard({ tool }: { tool: ToolInfo }) {
  const Icon = tool.icon;

  return (
    <Card className="h-full">
      <Card.Header className="flex-row items-start justify-between">
        <span className={`flex size-9 items-center justify-center rounded-lg ${tool.accent}`}>
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="rounded-md bg-default px-2 py-0.5 text-[10px] text-muted">{tool.category}</span>
      </Card.Header>
      <Card.Content>
        <Card.Title className="text-base">{tool.title}</Card.Title>
        <Card.Description className="mt-1">{tool.description}</Card.Description>
      </Card.Content>
      <Card.Footer>
        <Link
          href={tool.href}
          className="flex w-full items-center justify-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent-hover"
        >
          Abrir herramienta <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Card.Footer>
    </Card>
  );
}
