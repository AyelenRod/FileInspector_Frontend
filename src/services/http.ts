import axios, { type AxiosError, type AxiosProgressEvent } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const api = axios.create({ baseURL: API_URL, timeout: 60_000 });

export type ProgressCallback = (percent: number) => void;

export const toConfig = (onProgress?: ProgressCallback, signal?: AbortSignal) => ({
  signal,
  onUploadProgress: (e: AxiosProgressEvent) => {
    if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
  },
});

export function isCancel(error: unknown): boolean {
  return axios.isCancel(error);
}

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
