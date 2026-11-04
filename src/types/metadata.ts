export interface MetadataResult {
  filename: string;
  size: number;
  camera: { make?: string | null; model?: string | null } | null;
  date_taken: string | null;
  gps: { latitude: number; longitude: number; altitude?: number | null } | null;
  software: string | null;
  extra: Record<string, string | number | null>;
}

export type CleanOutputFormat = "jpeg" | "png";

export interface CleanMetadataResult {
  blob: Blob;
  filename: string;
  originalSize: number;
  cleanSize: number;
  removedBlocks: string[];
  width: number | null;
  height: number | null;
}
