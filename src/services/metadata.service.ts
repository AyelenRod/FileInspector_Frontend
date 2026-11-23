import { api, toConfig, type ProgressCallback } from "./http";
import { base64ToBlob, fileToBase64 } from "@/lib/base64";
import { MAX_REMOVED_BLOCKS } from "@/lib/limits";
import { blobMatchesImage, detectImageSignature, readHeader } from "@/lib/security/magic-bytes";
import { sanitizeFilename } from "@/lib/security/sanitize";
import type { CleanMetadataResult, MetadataResult } from "@/types";

interface CleanResponse {
  success: boolean;
  data: {
    filename: string;
    file_type: string;
    original_size_bytes: number;
    cleaned_size_bytes: number;
    removed_metadata: string[];
    cleaned_file_base64: string;
  };
}

interface ExifResponse {
  success: boolean;
  data: {
    filename: string;
    file_type: string;
    exif: {
      fields: { tag: string; value: string | number | null; sensitive: boolean }[];
      gps: { latitude: number; longitude: number } | null;
      has_sensitive_data: boolean;
    };
  };
}

const MAIN_TAGS = ["Make", "Model", "Software", "DateTime", "DateTimeOriginal"];

function fieldValue(fields: ExifResponse["data"]["exif"]["fields"], ...tags: string[]): string | null {
  const field = tags.map((tag) => fields.find((f) => f.tag === tag)).find(Boolean);
  return field?.value != null ? String(field.value) : null;
}

export async function extractMetadata(file: File, onProgress?: ProgressCallback): Promise<MetadataResult> {
  const { data } = await api.post<ExifResponse>(
    "/exif",
    { file_base64: await fileToBase64(file), filename: file.name },
    toConfig(onProgress),
  );
  const { fields, gps } = data.data.exif;
  const make = fieldValue(fields, "Make");
  const model = fieldValue(fields, "Model");
  return {
    filename: data.data.filename,
    size: file.size,
    camera: make || model ? { make, model } : null,
    date_taken: fieldValue(fields, "DateTimeOriginal", "DateTime"),
    gps,
    software: fieldValue(fields, "Software"),
    extra: Object.fromEntries(
      fields.filter((f) => !MAIN_TAGS.includes(f.tag)).map((f) => [f.tag, f.value]),
    ),
  };
}

export async function cleanMetadata(
  file: File,
  onProgress?: ProgressCallback,
  signal?: AbortSignal,
): Promise<CleanMetadataResult> {
  const { data } = await api.post<CleanResponse>(
    "/clean",
    { file_base64: await fileToBase64(file), filename: file.name },
    toConfig(onProgress, signal),
  );
  const result = data.data;
  const blob = base64ToBlob(result.cleaned_file_base64, result.file_type);
  const expected = detectImageSignature(await readHeader(file));
  if (!expected || !(await blobMatchesImage(blob, expected))) {
    throw new Error("El servidor devolvió un archivo no válido.");
  }
  return {
    blob,
    filename: sanitizeFilename(`limpio_${file.name}`),
    originalSize: file.size,
    cleanSize: blob.size,
    removedBlocks: result.removed_metadata.slice(0, MAX_REMOVED_BLOCKS),
    width: null,
    height: null,
  };
}
