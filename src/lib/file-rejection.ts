import type { FileRejection } from "react-dropzone";

export function rejectionMessage(rejections: FileRejection[], maxSizeMB: number): string {
  const codes = new Set(rejections.flatMap((r) => r.errors.map((e) => e.code)));
  if (codes.has("file-too-large")) return `El archivo supera el límite de ${maxSizeMB} MB.`;
  if (codes.has("file-invalid-type")) return "El formato de archivo no está permitido en esta herramienta.";
  if (codes.has("too-many-files")) return "Solo puedes seleccionar un archivo.";
  return rejections[0]?.errors[0]?.message ?? "Archivo no válido.";
}
