import { CheckCircle2, XCircle } from "lucide-react";

export function HashMatchBanner({ matchedLabel }: { matchedLabel?: string }) {
  if (matchedLabel) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-success/40 bg-success/10 p-4">
        <CheckCircle2 className="size-5 text-success" aria-hidden />
        <div>
          <p className="font-semibold">Coincide con {matchedLabel}</p>
          <p className="text-xs text-muted">Integridad confirmada: el hash ingresado es exactamente igual al resultado calculado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4">
      <XCircle className="size-5 text-danger" aria-hidden />
      <div>
        <p className="font-semibold">No coincide con ningún hash</p>
        <p className="text-xs text-muted">Discrepancia detectada: el archivo podría estar corrupto o haber sido alterado.</p>
      </div>
    </div>
  );
}
