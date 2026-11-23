import { Card } from "@heroui/react";
import { PrivacyNote } from "@/components/shared/PrivacyNote";
import { RECOGNIZED_TYPES } from "@/lib/recognized-types";

export function RecognizedTypesCard() {
  return (
    <Card>
      <Card.Header>
        <Card.Title className="text-base">Tipos reconocidos</Card.Title>
        <Card.Description>Inspección de firmas binarias (magic bytes) soportadas</Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          {RECOGNIZED_TYPES.map((type) => (
            <span key={type} className="rounded-md bg-default px-2 py-1 text-xs text-muted">{type}</span>
          ))}
        </div>
        <PrivacyNote>El archivo se analiza en memoria y no se guarda.</PrivacyNote>
      </Card.Content>
    </Card>
  );
}
