import { Button, Card } from "@heroui/react";
import { FileText } from "lucide-react";
import { formatBytes } from "@/lib/format";
import type { HashResult } from "@/types";

export function HashSummaryCard({ data, onReset }: { data: HashResult; onReset: () => void }) {
  return (
    <Card>
      <Card.Content className="flex flex-wrap items-center gap-3">
        <FileText className="size-6 text-muted" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="break-all font-semibold">{data.source}</p>
          <p className="text-xs text-muted">Tamaño: {formatBytes(data.size)} · Procesado en memoria local</p>
        </div>
        <Button variant="secondary" onPress={onReset}>Calcular nuevo hash</Button>
      </Card.Content>
    </Card>
  );
}
