import { Card } from "@heroui/react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { stripLeadingDot } from "@/lib/format";
import type { MimeResult } from "@/types";

export function FormatComparison({ data }: { data: MimeResult }) {
  const ok = data.matches;

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Discrepancia de formato</h2>
        <span className="text-xs text-muted">Confianza del motor: {data.confidence}%</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <Card.Content>
            <p className="text-[11px] uppercase tracking-wide text-muted">Extensión declarada</p>
            <p className="mt-2 text-3xl font-bold">.{stripLeadingDot(data.declared_extension)}</p>
            <p className="mt-1 text-xs text-muted">MIME aparente: {data.declared_mime ?? "—"}</p>
          </Card.Content>
        </Card>
        <Card>
          <Card.Content>
            <p className="flex items-center justify-between text-[11px] uppercase tracking-wide text-muted">
              Tipo real detectado (firma física)
              {ok ? <CheckCircle2 className="size-4 text-success" /> : <AlertTriangle className="size-4 text-danger" />}
            </p>
            <p className={`mt-2 break-all text-2xl font-bold ${ok ? "" : "text-danger"}`}>{data.detected_mime}</p>
            <p className="mt-1 text-xs text-muted">{data.signature_description ?? data.detected_extension ?? ""}</p>
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
