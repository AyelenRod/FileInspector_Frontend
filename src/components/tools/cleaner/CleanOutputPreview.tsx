import { Card } from "@heroui/react";

interface CleanOutputPreviewProps {
  previewUrl: string | null;
  width: number | null;
  height: number | null;
}

export function CleanOutputPreview({ previewUrl, width, height }: CleanOutputPreviewProps) {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-xs uppercase text-muted">Vista previa de salida</Card.Title>
        {width && height && <Card.Description>{width} × {height} px</Card.Description>}
      </Card.Header>
      <Card.Content>
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Imagen limpia" className="max-h-48 w-full rounded-xl object-contain" />
        )}
      </Card.Content>
    </Card>
  );
}
