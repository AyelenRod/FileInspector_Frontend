import type { MimeResult } from "@/types";

export function MimeResultFooter({ data }: { data: MimeResult }) {
  return (
    <p className="text-xs text-muted">
      Inspección segura, sin persistencia en disco
      {data.analysis_ms != null && <> · Tiempo de análisis: {data.analysis_ms} ms</>}
    </p>
  );
}
