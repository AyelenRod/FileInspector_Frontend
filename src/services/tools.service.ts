import axios, { AxiosError, type AxiosProgressEvent } from "axios";
import type {
  BinaryDiffResult,
  CleanMetadataResult,
  CleanOutputFormat,
  HashAlgorithm,
  HashResult,
  MetadataResult,
  MimeResult,
} from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const api = axios.create({ baseURL: API_URL, timeout: 60_000 });

export type ProgressCallback = (percent: number) => void;

const toConfig = (onProgress?: ProgressCallback, signal?: AbortSignal) => ({
  signal,
  onUploadProgress: (e: AxiosProgressEvent) => {
    if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
  },
});

export function isCancel(error: unknown): boolean {
  return axios.isCancel(error);
}

/** Convierte cualquier error de Axios en un mensaje legible. */
export function getErrorMessage(error: unknown): string {
  if (axios.isCancel(error)) return "Operación cancelada.";
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ detail?: unknown }>;
    const detail = err.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (err.code === "ECONNABORTED") return "El servidor tardó demasiado en responder.";
    if (!err.response) return "No se pudo conectar con el servidor.";
    if (err.response.status === 413) return "El archivo excede el tamaño permitido por el servidor.";
    return `Error del servidor (${err.response.status}).`;
  }
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
}

function filenameFromDisposition(header: string | undefined, fallback: string): string {
  const match = header?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  return match ? decodeURIComponent(match[1]) : fallback;
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
  const h = res.headers;
  const num = (v: unknown) => (v != null && v !== "" && !isNaN(Number(v)) ? Number(v) : null);
  const blocks = String(h["x-removed-blocks"] ?? "");
  return {
    blob: res.data,
    filename: filenameFromDisposition(
      h["content-disposition"],
      `limpio_${file.name.replace(/\.[^.]+$/, "")}.${outputFormat === "jpeg" ? "jpg" : "png"}`,
    ),
    originalSize: file.size,
    cleanSize: res.data.size,
    removedBlocks: blocks ? blocks.split(",").map((b) => b.trim()) : [],
    width: num(h["x-image-width"]),
    height: num(h["x-image-height"]),
  };
}

export async function verifyMime(file: File, onProgress?: ProgressCallback) {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<MimeResult>("/mime/verify", form, toConfig(onProgress));
  return data;
}

export async function calculateHash(
  input: { file: File } | { text: string },
  algorithms: HashAlgorithm[],
  onProgress?: ProgressCallback,
) {
  const form = new FormData();
  if ("file" in input) form.append("file", input.file);
  else form.append("text", input.text);
  algorithms.forEach((a) => form.append("algorithms", a));
  const { data } = await api.post<HashResult>("/hash", form, toConfig(onProgress));
  return data;
}

export async function compareFiles(fileA: File, fileB: File, onProgress?: ProgressCallback) {
  const form = new FormData();
  form.append("file_a", fileA);
  form.append("file_b", fileB);
  const { data } = await api.post<BinaryDiffResult>("/compare", form, toConfig(onProgress));
  return data;
}

/** Dispara la descarga en el navegador de un Blob. */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
