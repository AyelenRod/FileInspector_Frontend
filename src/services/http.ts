import axios, { type AxiosError, type AxiosProgressEvent } from "axios";
import { RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS } from "@/lib/limits";
import { resolveApiUrl } from "@/lib/security/api-url";
import { RateLimitError, createRateLimiter } from "@/lib/security/rate-limiter";
import { limitText } from "@/lib/security/sanitize";

export const API_URL = resolveApiUrl();

export const api = axios.create({ baseURL: API_URL, timeout: 60_000, withCredentials: false });

const rateLimiter = createRateLimiter(RATE_LIMIT_MAX_REQUESTS, RATE_LIMIT_WINDOW_MS);

api.interceptors.request.use((config) => {
  rateLimiter.consume();
  return config;
});

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
  if (error instanceof RateLimitError) return error.message;
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<{ detail?: unknown; error?: { message?: unknown } }>;
    const detail = err.response?.data?.detail;
    const apiMessage = err.response?.data?.error?.message;
    if (typeof apiMessage === "string") return limitText(apiMessage);
    if (typeof detail === "string") return limitText(detail);
    if (err.code === "ECONNABORTED") return "El servidor tardó demasiado en responder.";
    if (!err.response) return "No se pudo conectar con el servidor.";
    if (err.response.status === 429) return "Demasiadas solicitudes. Espera un momento antes de reintentar.";
    if (err.response.status === 413) return "El archivo excede el tamaño permitido por el servidor.";
    return `Error del servidor (${err.response.status}).`;
  }
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
}
