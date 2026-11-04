import { Card, Skeleton } from "@heroui/react";
import { Fingerprint } from "lucide-react";
import { PrivacyNote } from "@/components/shared/PrivacyNote";
import type { HashAlgorithm } from "@/types";

interface HashResultsPlaceholderProps {
  isLoading: boolean;
  selected: HashAlgorithm[];
}

export function HashResultsPlaceholder({ isLoading, selected }: HashResultsPlaceholderProps) {
  return (
    <Card>
      <Card.Content className="flex h-full flex-col gap-4">
        <p className="font-semibold">Resultados</p>
        {isLoading ? (
          <div className="flex flex-col gap-3">
            {selected.map((algorithm) => <Skeleton key={algorithm} className="h-14 w-full rounded-xl" />)}
          </div>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <Fingerprint className="size-10 text-muted" aria-hidden />
            <p className="font-semibold">Aún no hay resultados</p>
            <p className="max-w-xs text-xs text-muted">
              Selecciona un archivo o escribe texto y haz clic en «Calcular hash» para generar las sumas criptográficas.
            </p>
          </div>
        )}
        <PrivacyNote>El cálculo se realiza en memoria y el archivo no se almacena.</PrivacyNote>
      </Card.Content>
    </Card>
  );
}
