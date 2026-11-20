import { api, toConfig, type ProgressCallback } from "./http";
import { fileToBase64 } from "@/lib/base64";
import { hexToAscii } from "@/lib/format";
import { readHeader } from "@/lib/security/magic-bytes";
import type { MimeResult } from "@/types";

interface MimeResponse {
  success: boolean;
  data: {
    filename: string;
    declared_extension: string;
    detected_mime_type: string;
    extension_matches: boolean;
    suspicious: boolean;
    suspicious_reasons: string[];
  };
}

const MAGIC_BYTES_LENGTH = 8;

export async function verifyMime(file: File, onProgress?: ProgressCallback): Promise<MimeResult> {
  const started = performance.now();
  const { data } = await api.post<MimeResponse>(
    "/mime",
    { file_base64: await fileToBase64(file), filename: file.name },
    toConfig(onProgress),
  );
  const header = Array.from(await readHeader(file, MAGIC_BYTES_LENGTH), (byte) =>
    byte.toString(16).toUpperCase().padStart(2, "0"),
  );
  const result = data.data;
  return {
    filename: result.filename,
    size: file.size,
    declared_extension: result.declared_extension,
    declared_mime: null,
    detected_mime: result.detected_mime_type,
    detected_extension: null,
    magic_bytes: header.join(" "),
    magic_ascii: header.map(hexToAscii).join(""),
    signature_description: result.suspicious_reasons[0] ?? null,
    sha256: null,
    confidence: null,
    matches: result.extension_matches && !result.suspicious,
    analysis_ms: Math.round(performance.now() - started),
  };
}
