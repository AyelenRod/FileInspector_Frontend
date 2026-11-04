import { Button, Card } from "@heroui/react";
import { formatBytes } from "@/lib/format";
import type { MimeResult } from "@/types";

export function MimeFileHeader({ data, onReset }: { data: MimeResult; onReset: () => void }) {
  return (
    <Card>
      <Card.Content className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="break-all font-semibold">{data.filename}</p>
          <p className="text-xs text-muted">
            {formatBytes(data.size)} · Declarado como {data.declared_mime ?? data.declared_extension}
            {data.sha256 && <> · SHA-256: {data.sha256.slice(0, 16)}…</>}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            data.matches ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
          }`}
        >
          {data.matches ? "Archivo legítimo" : "Sospechoso detectado"}
        </span>
        <Button size="sm" variant="secondary" onPress={onReset}>Cambiar archivo</Button>
      </Card.Content>
    </Card>
  );
}
