"use client";

import { useState } from "react";
import { Alert, Button, Card } from "@heroui/react";
import { AlertTriangle, CheckCircle2, Download, ShieldAlert, Terminal } from "lucide-react";
import { API_URL, downloadBlob } from "@/services/tools.service";
import { formatBytes } from "@/lib/tools";
import type { MimeResult } from "@/types";

export function MimeResultCard({ data, onReset }: { data: MimeResult; onReset: () => void }) {
  const ok = data.matches;
  const [copied, setCopied] = useState(false);

  const copyCurl = async () => {
    try {
      await navigator.clipboard.writeText(`curl -X POST ${API_URL}/mime/verify -F "file=@${data.filename}"`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* portapapeles no disponible */
    }
  };

  const exportJson = () =>
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), `${data.filename}.mime.json`);

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <Card.Content className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="break-all font-semibold">{data.filename}</p>
            <p className="text-xs text-muted">
              {formatBytes(data.size)} · Declarado como {data.declared_mime ?? data.declared_extension}
              {data.sha256 && <> · SHA-256: {data.sha256.slice(0, 16)}…</>}
            </p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ok ? "bg-success/20 text-success" : "bg-danger/20 text-danger"}`}>
            {ok ? "Archivo legítimo" : "Sospechoso detectado"}
          </span>
          <Button size="sm" variant="secondary" onPress={onReset}>Cambiar archivo</Button>
        </Card.Content>
      </Card>

      <Alert status={ok ? "success" : "danger"}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>
            {ok
              ? `La extensión coincide con el tipo real (${data.detected_mime}).`
              : `Archivo sospechoso. Dice ser .${data.declared_extension.replace(/^\./, "")} pero es ${data.detected_mime}.`}
          </Alert.Title>
          <Alert.Description>
            {ok
              ? "La firma binaria corresponde con la extensión declarada."
              : "Se detectó una discrepancia entre la extensión declarada y la cabecera real del archivo."}
          </Alert.Description>
        </Alert.Content>
      </Alert>

      <div className="flex items-center justify-between">
        <h2 className="font-semibold">Discrepancia de formato</h2>
        <span className="text-xs text-muted">Confianza del motor: {data.confidence}%</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <Card.Content>
            <p className="text-[11px] uppercase tracking-wide text-muted">Extensión declarada</p>
            <p className="mt-2 text-3xl font-bold">.{data.declared_extension.replace(/^\./, "")}</p>
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

      <Card>
        <Card.Header>
          <Card.Title className="text-sm">Magic bytes inspeccionados (offset 0x00000000)</Card.Title>
        </Card.Header>
        <Card.Content className="flex flex-wrap items-center gap-2">
          {data.magic_bytes.split(/\s+/).map((b, i) => (
            <code key={i} className="rounded-md bg-default px-2 py-1 font-mono text-xs">{b}</code>
          ))}
          {data.magic_ascii && (
            <span className="ml-2 text-xs text-muted">ASCII interpretado: <code className="font-mono">{data.magic_ascii}</code></span>
          )}
        </Card.Content>
      </Card>

      {!ok && (
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
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
        <span>
          Inspección segura, sin persistencia en disco
          {data.analysis_ms != null && <> · Tiempo de análisis: {data.analysis_ms} ms</>}
        </span>
        <div className="flex gap-2">
          <Button size="sm" variant="secondary" onPress={copyCurl}>
            <Terminal className="size-3.5" /> {copied ? "¡Copiado!" : "Ver en cURL"}
          </Button>
          <Button size="sm" variant="secondary" onPress={exportJson}>
            <Download className="size-3.5" /> Exportar reporte JSON
          </Button>
        </div>
      </div>
    </div>
  );
}
