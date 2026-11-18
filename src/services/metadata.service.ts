import { api, toConfig, type ProgressCallback } from "./http";
import { fileToBase64 } from "@/lib/base64";
import { MAX_REMOVED_BLOCKS } from "@/lib/limits";
import { blobMatchesImage } from "@/lib/security/magic-bytes";
import { sanitizeFilename } from "@/lib/security/sanitize";
import type { CleanMetadataResult, CleanOutputFormat, MetadataResult } from "@/types";

function filenameFromDisposition(header: string | undefined, fallback: string): string {
  const match = header?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  if (!match) return fallback;
  try {
    return sanitizeFilename(decodeURIComponent(match[1]), fallback);
  } catch {
    return fallback;
  }
}

function toNumberOrNull(value: unknown): number | null {
  return value != null && value !== "" && !isNaN(Number(value)) ? Number(value) : null;
}

function parseRemovedBlocks(header: unknown): string[] {
  const raw = String(header ?? "");
  return raw ? raw.split(",").slice(0, MAX_REMOVED_BLOCKS).map((block) => block.trim()) : [];
}

function fallbackCleanName(file: File, outputFormat: CleanOutputFormat): string {
  const extension = outputFormat === "jpeg" ? "jpg" : "png";
  return `limpio_${file.name.replace(/\.[^.]+$/, "")}.${extension}`;
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
  outputFormat: CleanOutputFormat,
  onProgress?: ProgressCallback,
  signal?: AbortSignal,
): Promise<CleanMetadataResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("output_format", outputFormat);
  const res = await api.post<Blob>("/metadata/clean", form, {
    ...toConfig(onProgress, signal),
    responseType: "blob",
  });
  if (!(await blobMatchesImage(res.data, outputFormat))) throw new Error("El servidor devolvió un archivo no válido.");
  const headers = res.headers;
  return {
    blob: res.data,
    filename: filenameFromDisposition(headers["content-disposition"], fallbackCleanName(file, outputFormat)),
    originalSize: file.size,
    cleanSize: res.data.size,
    removedBlocks: parseRemovedBlocks(headers["x-removed-blocks"]),
    width: toNumberOrNull(headers["x-image-width"]),
    height: toNumberOrNull(headers["x-image-height"]),
  };
}
