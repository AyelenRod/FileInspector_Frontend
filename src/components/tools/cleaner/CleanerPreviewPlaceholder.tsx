import { Card } from "@heroui/react";
import { EyeOff } from "lucide-react";
import { PrivacyNote } from "@/components/shared/PrivacyNote";

export function CleanerPreviewPlaceholder() {
  return (
    <Card>
      <Card.Content className="flex h-full flex-col gap-4">
        <p className="text-sm font-semibold">Vista previa</p>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-separator p-8 text-center text-sm text-muted">
          <EyeOff className="size-6" aria-hidden />
          Aún no has seleccionado una imagen
        </div>
        <PrivacyNote>Tu imagen se procesa en memoria y no se guarda.</PrivacyNote>
      </Card.Content>
    </Card>
  );
}
