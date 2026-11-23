export type ImageSignature = "jpeg" | "png" | "tiff" | "heic";

const HEIC_BRANDS = ["heic", "heix", "heim", "heis", "hevc", "hevx", "mif1", "msf1"];

function matches(bytes: Uint8Array, signature: number[], offset = 0): boolean {
  return signature.every((value, index) => bytes[offset + index] === value);
}

function asciiAt(bytes: Uint8Array, start: number, end: number): string {
  return String.fromCharCode(...bytes.slice(start, end));
}

export async function readHeader(blob: Blob, length = 16): Promise<Uint8Array> {
  return new Uint8Array(await blob.slice(0, length).arrayBuffer());
}

export function detectImageSignature(bytes: Uint8Array): ImageSignature | null {
  if (matches(bytes, [0xff, 0xd8, 0xff])) return "jpeg";
  if (matches(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return "png";
  if (matches(bytes, [0x49, 0x49, 0x2a, 0x00]) || matches(bytes, [0x4d, 0x4d, 0x00, 0x2a])) return "tiff";
  if (asciiAt(bytes, 4, 8) === "ftyp" && HEIC_BRANDS.includes(asciiAt(bytes, 8, 12))) return "heic";
  return null;
}

export async function blobMatchesImage(blob: Blob, expected: ImageSignature): Promise<boolean> {
  return detectImageSignature(await readHeader(blob)) === expected;
}
