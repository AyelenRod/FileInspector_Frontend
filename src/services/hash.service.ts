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

export async function calculateHash(
  input: { file: File } | { text: string },
  algorithms: HashAlgorithm[],
  onProgress?: ProgressCallback,
): Promise<HashResult> {
  const content = "file" in input ? input.file : new Blob([input.text], { type: "text/plain" });
  const filename = "file" in input ? input.file.name : "texto.txt";
  const { data } = await api.post<HashResponse>(
    "/hash",
    { file_base64: await fileToBase64(content), filename },
    toConfig(onProgress),
  );
  return {
    source: data.data.filename,
    size: data.data.file_size_bytes,
    hashes: Object.fromEntries(algorithms.map((algorithm) => [algorithm, data.data.hashes[algorithm]])),
  };
}
