/** Respuestas de la API REST (FastAPI) para cada herramienta. */

export interface MetadataResult {
  filename: string;
  size: number;
  camera: { make?: string | null; model?: string | null } | null;
  date_taken: string | null;
  gps: { latitude: number; longitude: number; altitude?: number | null } | null;
  software: string | null;
  extra: Record<string, string | number | null>;
}

export type CleanOutputFormat = "jpeg" | "png";

export interface CleanMetadataResult {
  blob: Blob;
  filename: string;
  originalSize: number;
  cleanSize: number;
  /** Bloques eliminados (cabecera X-Removed-Blocks); vacío si el backend no los informa. */
  removedBlocks: string[];
  width: number | null;
  height: number | null;
}

export interface MimeResult {
  filename: string;
  size: number;
  declared_extension: string;
  declared_mime: string | null;
  detected_mime: string;
  detected_extension: string | null;
  /** Magic bytes en hexadecimal separados por espacio: "4D 5A 90 00". */
  magic_bytes: string;
  magic_ascii: string | null;
  signature_description: string | null;
  sha256: string | null;
  confidence: number;
  matches: boolean;
  analysis_ms: number | null;
}

export type HashAlgorithm = "md5" | "sha1" | "sha256" | "sha512";

export interface HashResult {
  source: string;
  size: number;
  hashes: Partial<Record<HashAlgorithm, string>>;
}

export interface DiffRow {
  offset: number;
  /** Byte en hexadecimal ("4a") o null si el archivo terminó antes. */
  a: string | null;
  b: string | null;
}

export interface BinaryDiffResult {
  identical: boolean;
  size_a: number;
  size_b: number;
  matching_bytes: number;
  total_differences: number;
  /** Primeras diferencias (el backend limita a 1000). */
  differences: DiffRow[];
}
