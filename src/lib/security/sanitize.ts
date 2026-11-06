import { MAX_ERROR_MESSAGE_LENGTH } from "@/lib/limits";

const FORBIDDEN_FILENAME_CHARACTERS = /[\u0000-\u001f\u007f<>:"/\|?*]/g;

export function sanitizeFilename(name: string, fallback = "archivo"): string {
  const base = name.split(/[\/]/).pop() ?? "";
  const cleaned = base.replace(FORBIDDEN_FILENAME_CHARACTERS, "_").replace(/^[.\s]+|[.\s]+$/g, "");
  return (cleaned || fallback).slice(0, 120);
}

export function escapeCsvCell(value: string | number | null): string {
  const text = String(value ?? "");
  const safe = /^[=+\-@\t\r]/.test(text) ? `'${text}` : text;
  return /[",\n\r]/.test(safe) ? `"${safe.replace(/"/g, '""')}"` : safe;
}

export function shellQuote(value: string): string {
  return `'${value.replace(/'/g, `'\''`)}'`;
}

export function limitText(value: string, max = MAX_ERROR_MESSAGE_LENGTH): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

export function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  );
}
