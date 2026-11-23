import { Button, Card } from "@heroui/react";
import { RotateCcw } from "lucide-react";
import { formatBytes } from "@/lib/format";

interface ProcessedInputCardProps {
  filename?: string;
  originalSize: number;
  onChangeImage: () => void;
}

export function ProcessedInputCard({ filename, originalSize, onChangeImage }: ProcessedInputCardProps) {
  return (
    <Card>
      <Card.Header><Card.Title className="text-xs uppercase text-muted">Entrada procesada</Card.Title></Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <div className="rounded-xl border border-separator p-3">
          <p className="break-all text-sm font-semibold">{filename}</p>
          <p className="text-xs text-muted">Original: {formatBytes(originalSize)}</p>
        </div>
        <Button variant="secondary" onPress={onChangeImage}>
          <RotateCcw className="size-4" /> Cambiar imagen
        </Button>
      </Card.Content>
    </Card>
  );
}
