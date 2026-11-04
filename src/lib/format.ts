import type { MetadataResult } from "@/types";

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i++;
  }
  return `${value.toFixed(1)} ${units[i]}`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("es");
}

export function formatHexOffset(offset: number): string {
  return `0x${offset.toString(16).toUpperCase().padStart(4, "0")}`;
}

export function hexToAscii(hex: string | null): string {
  if (hex === null) return "";
  const code = parseInt(hex, 16);
  return code >= 32 && code <= 126 ? String.fromCharCode(code) : "·";
}

export function stripLeadingDot(extension: string): string {
  return extension.replace(/^\./, "");
}

export function formatCamera(camera: MetadataResult["camera"]): string | null {
  if (!camera) return null;
  return [camera.make, camera.model].filter(Boolean).join(" ") || null;
}
