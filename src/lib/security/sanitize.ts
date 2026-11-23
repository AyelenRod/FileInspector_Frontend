import { MAX_ERROR_MESSAGE_LENGTH } from "@/lib/limits";

const FORBIDDEN_FILENAME_CHARACTERS = /[\u0000-\u001f\u007f<>:"/\|?*]/g;

export function sanitizeFilename(name: string, fallback = "archivo"): string {
  const base = name.split(/[\/]/).pop() ?? "";
  const cleaned = base.replace(FORBIDDEN_FILENAME_CHARACTERS, "_").replace(/^[.\s]+|[.\s]+$/g, "");
  return (cleaned || fallback).slice(0, 120);
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
