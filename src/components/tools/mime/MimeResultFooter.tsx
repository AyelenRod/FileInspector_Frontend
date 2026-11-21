"use client";

import { Button } from "@heroui/react";
import { Terminal } from "lucide-react";
import { useClipboard } from "@/hooks/useClipboard";
import { sanitizeFilename, shellQuote } from "@/lib/security/sanitize";
import { API_URL } from "@/services/http";
import type { MimeResult } from "@/types";

const CURL_KEY = "curl";

export function MimeResultFooter({ data }: { data: MimeResult }) {
  const { copiedKey, copy } = useClipboard();

  const copyCurl = () =>
    copy(
      CURL_KEY,
      `f=${shellQuote(sanitizeFilename(data.filename))}; curl -X POST ${shellQuote(`${new URL(API_URL, window.location.origin).href}/mime`)} -H 'Content-Type: application/json' -d "{\\"file_base64\\":\\"$(base64 -w0 "$f")\\",\\"filename\\":\\"$f\\"}"`,
    );

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
      </div>
    </div>
  );
}
