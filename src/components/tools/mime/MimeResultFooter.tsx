"use client";

import { Button } from "@heroui/react";
import { Download, Terminal } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { downloadBlob } from "@/lib/download";
import { API_URL } from "@/services/http";
import type { MimeResult } from "@/types";

const CURL_KEY = "curl";

export function MimeResultFooter({ data }: { data: MimeResult }) {
  const { copiedKey, copy } = useClipboard();

  const copyCurl = () => copy(CURL_KEY, `curl -X POST ${API_URL}/mime/verify -F "file=@${data.filename}"`);

  const exportJson = () =>
    downloadBlob(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), `${data.filename}.mime.json`);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
      <span>
        Inspección segura, sin persistencia en disco
        {data.analysis_ms != null && <> · Tiempo de análisis: {data.analysis_ms} ms</>}
      </span>
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onPress={copyCurl}>
          <Terminal className="size-3.5" /> {copiedKey === CURL_KEY ? "¡Copiado!" : "Ver en cURL"}
        </Button>
        <Button size="sm" variant="secondary" onPress={exportJson}>
          <Download className="size-3.5" /> Exportar reporte JSON
        </Button>
      </div>
    </div>
  );
}
