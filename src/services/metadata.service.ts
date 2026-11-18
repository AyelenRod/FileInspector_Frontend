import { api, toConfig, type ProgressCallback } from "./http";
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

export async function extractMetadata(file: File, onProgress?: ProgressCallback) {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<MetadataResult>("/metadata/extract", form, toConfig(onProgress));
  return data;
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
