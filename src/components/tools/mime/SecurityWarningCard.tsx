import { Button, Card } from "@heroui/react";
import { ShieldAlert } from "lucide-react";

export function SecurityWarningCard({ onReset }: { onReset: () => void }) {
  return (
    <Card>
      <Card.Content className="flex items-center gap-3">
        <ShieldAlert className="size-6 shrink-0 text-danger" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">Recomendación de seguridad crítica</p>
          <p className="text-xs text-muted">
            No abras este archivo. Si lo recibiste por correo, mensajería o descarga dudosa, elimínalo de forma permanente.
          </p>
        </div>
        <Button size="sm" onPress={onReset}>Verificar otro archivo</Button>
      </Card.Content>
    </Card>
  );
}
