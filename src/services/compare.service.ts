import { api, toConfig, type ProgressCallback } from "./http";
import { fileToBase64 } from "@/lib/base64";
import type { BinaryDiffResult } from "@/types";

interface CompareResponse {
  success: boolean;
  data: {
    size_a: number;
    size_b: number;
    identical: boolean;
    total_differences: number;
    truncated: boolean;
    differences: { position: number; value_a: number | null; value_b: number | null }[];
  };
}

const toHexByte = (value: number | null) => (value === null ? null : value.toString(16).toUpperCase().padStart(2, "0"));

export async function compareFiles(
  fileA: File,
  fileB: File,
  onProgress?: ProgressCallback,
): Promise<BinaryDiffResult> {
  const { data } = await api.post<CompareResponse>(
    "/compare",
    {
      file_base64_a: await fileToBase64(fileA),
      filename_a: fileA.name,
      file_base64_b: await fileToBase64(fileB),
      filename_b: fileB.name,
    },
    toConfig(onProgress),
  );
  const result = data.data;
  const overlapDifferences = Math.max(0, result.total_differences - Math.abs(result.size_a - result.size_b));
  return {
    identical: result.identical,
    size_a: result.size_a,
    size_b: result.size_b,
    matching_bytes: Math.max(0, Math.min(result.size_a, result.size_b) - overlapDifferences),
    total_differences: result.total_differences,
    differences: result.differences.map((row) => ({
      offset: row.position,
      a: toHexByte(row.value_a),
      b: toHexByte(row.value_b),
    })),
  };
}
