import { BYTES_PER_MB, MAX_FILENAME_LENGTH } from "@/lib/limits";
import { detectImageSignature, readHeader, type ImageSignature } from "./magic-bytes";

const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;

const EXTENSION_SIGNATURES: Record<string, ImageSignature> = {
  jpg: "jpeg",
  jpeg: "jpeg",
  png: "png",
  tif: "tiff",
  tiff: "tiff",
  heic: "heic",
};

function extensionOf(name: string): string {
  const index = name.lastIndexOf(".");
  return index === -1 ? "" : name.slice(index + 1).toLowerCase();
}

export async function validateBasicFile(file: File, maxSizeMB: number): Promise<string | null> {
  if (file.size === 0) return "El archivo está vacío.";
  if (file.size > maxSizeMB * BYTES_PER_MB) return `El archivo supera el límite de ${maxSizeMB} MB.`;
  if (file.name.length > MAX_FILENAME_LENGTH) return "El nombre del archivo es demasiado largo.";
  if (CONTROL_CHARACTERS.test(file.name)) return "El nombre del archivo contiene caracteres no permitidos.";
  return null;
}

export async function validateImageFile(file: File, maxSizeMB: number): Promise<string | null> {
  const basicError = await validateBasicFile(file, maxSizeMB);
  if (basicError) return basicError;

  const expected = EXTENSION_SIGNATURES[extensionOf(file.name)];
  if (!expected) return "La extensión del archivo no corresponde a una imagen permitida.";

  const detected = detectImageSignature(await readHeader(file));
  if (!detected) return "El contenido del archivo no corresponde a una imagen válida.";
  if (detected !== expected) return "La extensión del archivo no coincide con su contenido real.";
  return null;
}
