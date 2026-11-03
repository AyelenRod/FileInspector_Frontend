"use client";

import { useState } from "react";
import { Button, Card, ProgressBar } from "@heroui/react";
import { Download, Info, TriangleAlert } from "lucide-react";
import { downloadBlob } from "@/services/tools.service";
import { formatBytes } from "@/lib/tools";
import type { BinaryDiffResult } from "@/types";

const PAGE_SIZE = 25;

const toAscii = (hex: string | null) => {
  if (hex === null) return "";
  const n = parseInt(hex, 16);
  return n >= 32 && n <= 126 ? String.fromCharCode(n) : "·";
};

export function BinaryDiffViewer({ data, onReset }: { data: BinaryDiffResult; onReset: () => void }) {
  const [page, setPage] = useState(0);
  const total = data.differences.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const rows = data.differences.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const maxSize = Math.max(data.size_a, data.size_b);
  const similarity = maxSize ? (data.matching_bytes / maxSize) * 100 : 100;

  const exportCsv = () => {
    const lines = ["offset_hex,offset_dec,byte_a,byte_b"];
    data.differences.forEach((r) =>
      lines.push(`0x${r.offset.toString(16).toUpperCase().padStart(4, "0")},${r.offset},${r.a ?? ""},${r.b ?? ""}`),
    );
    downloadBlob(new Blob([lines.join("\n")], { type: "text/csv" }), "diferencias.csv");
  };

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <Card.Content className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-semibold">
              {data.identical ? "Los archivos son idénticos" : `Se encontraron ${data.total_differences.toLocaleString("es")} diferencias`}
            </h2>
            {!data.identical && (
              <span className="rounded-full bg-danger/20 px-3 py-1 text-[11px] font-semibold uppercase text-danger">
                Discrepancia detectada
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Stat label="Tamaño Archivo A" value={`${data.size_a.toLocaleString("es")} bytes (${formatBytes(data.size_a)})`} />
            <Stat label="Tamaño Archivo B" value={`${data.size_b.toLocaleString("es")} bytes (${formatBytes(data.size_b)})`} />
            <Stat label="Bytes coincidentes" value={`${data.matching_bytes.toLocaleString("es")} / ${maxSize.toLocaleString("es")}`} />
          </div>
          <ProgressBar aria-label="Tasa de integridad coincidente" value={similarity}>
            <div className="flex justify-between text-xs text-muted">
              <span>Tasa de integridad coincidente</span>
              <span>Similitud: {similarity.toFixed(1)} %</span>
            </div>
            <ProgressBar.Track>
              <ProgressBar.Fill />
            </ProgressBar.Track>
          </ProgressBar>
        </Card.Content>
      </Card>

      {data.size_a !== data.size_b && (
        <div className="flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm">
          <TriangleAlert className="size-5 shrink-0 text-warning" aria-hidden />
          <p>
            <strong>Los archivos tienen tamaños distintos.</strong> Se comparan hasta el final del más corto; los bytes
            restantes cuentan como diferencia.
          </p>
        </div>
      )}
      {data.total_differences > total && (
        <div className="flex items-start gap-3 rounded-xl border border-separator bg-surface p-4 text-xs text-muted">
          <Info className="size-4 shrink-0" aria-hidden />
          Mostrando las primeras {total.toLocaleString("es")} diferencias en la tabla interactiva.
        </div>
      )}

      {total > 0 && (
        <Card>
          <Card.Header>
            <Card.Title className="text-base">Registro de offsets discrepantes</Card.Title>
          </Card.Header>
          <Card.Content className="flex flex-col gap-3">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[34rem] text-sm">
                <thead className="text-left text-xs text-muted">
                  <tr>
                    {["Offset (hexadecimal)", "Offset (decimal)", "Byte A", "Byte B", "ASCII A", "ASCII B"].map((h) => (
                      <th key={h} className="px-2 py-2 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {rows.map((r) => (
                    <tr key={r.offset} className="border-t border-separator">
                      <td className="px-2 py-2">0x{r.offset.toString(16).toUpperCase().padStart(4, "0")}</td>
                      <td className="px-2 py-2">{r.offset}</td>
                      <td className="px-2 py-2"><span className="rounded bg-accent/40 px-2 py-0.5 text-danger">{r.a?.toUpperCase() ?? "--"}</span></td>
                      <td className="px-2 py-2"><span className="rounded bg-accent/40 px-2 py-0.5 text-danger">{r.b?.toUpperCase() ?? "--"}</span></td>
                      <td className="px-2 py-2">{toAscii(r.a)}</td>
                      <td className="px-2 py-2">{toAscii(r.b)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between text-xs text-muted">
              <span>
                Mostrando {page * PAGE_SIZE + 1} - {Math.min((page + 1) * PAGE_SIZE, total)} de {total.toLocaleString("es")} diferencias
              </span>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" isDisabled={page === 0} onPress={() => setPage((p) => p - 1)}>Anterior</Button>
                <span>{page + 1} / {pages}</span>
                <Button size="sm" variant="secondary" isDisabled={page >= pages - 1} onPress={() => setPage((p) => p + 1)}>Siguiente</Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      )}

      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" onPress={onReset}>Comparar otros archivos</Button>
        {total > 0 && (
          <Button variant="secondary" onPress={exportCsv}>
            <Download className="size-4" /> Exportar diferencias .CSV
          </Button>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-separator p-3">
      <p className="text-[11px] text-muted">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
