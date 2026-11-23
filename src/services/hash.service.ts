import { api, toConfig, type ProgressCallback } from "./http";
import { fileToBase64 } from "@/lib/base64";
import type { HashAlgorithm, HashResult } from "@/types";

interface HashResponse {
  success: boolean;
  data: {
    filename: string;
    file_size_bytes: number;
    hashes: Record<HashAlgorithm, string>;
    weak_algorithms_warning?: string;
  };
}

export async function calculateHash(file: File, onProgress?: ProgressCallback): Promise<HashResult> {
  const { data } = await api.post<HashResponse>(
    "/hash",
    { file_base64: await fileToBase64(file), filename: file.name },
    toConfig(onProgress),
  );
  return {
    source: data.data.filename,
    size: data.data.file_size_bytes,
    hashes: data.data.hashes,
  };
}
