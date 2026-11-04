import { Card } from "@heroui/react";
import type { MimeResult } from "@/types";

export function MagicBytesCard({ data }: { data: MimeResult }) {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-sm">Magic bytes inspeccionados (offset 0x00000000)</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-wrap items-center gap-2">
        {data.magic_bytes.split(/\s+/).map((byte, i) => (
          <code key={i} className="rounded-md bg-default px-2 py-1 font-mono text-xs">{byte}</code>
        ))}
        {data.magic_ascii && (
          <span className="ml-2 text-xs text-muted">
            ASCII interpretado: <code className="font-mono">{data.magic_ascii}</code>
          </span>
        )}
      </Card.Content>
    </Card>
  );
}
