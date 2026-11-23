import { Button, Spinner } from "@heroui/react";
import { Sparkles } from "lucide-react";

interface CleanerActionsProps {
  canSubmit: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export function CleanerActions({ canSubmit, isLoading, onSubmit, onCancel }: CleanerActionsProps) {
  return (
    <div className="flex gap-2">
      <Button fullWidth isDisabled={!canSubmit || isLoading} onPress={onSubmit}>
        {isLoading ? <Spinner size="sm" /> : <Sparkles className="size-4" aria-hidden />}
        {isLoading ? "Procesando…" : "Limpiar imagen"}
      </Button>
      {isLoading && <Button variant="secondary" onPress={onCancel}>Cancelar</Button>}
    </div>
  );
}
