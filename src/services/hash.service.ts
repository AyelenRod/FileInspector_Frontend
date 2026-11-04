import { api, toConfig, type ProgressCallback } from "./http";
import type { HashAlgorithm, HashResult } from "@/types";

export async function calculateHash(
  input: { file: File } | { text: string },
  algorithms: HashAlgorithm[],
  onProgress?: ProgressCallback,
) {
  const form = new FormData();
  if ("file" in input) form.append("file", input.file);
  else form.append("text", input.text);
  algorithms.forEach((algorithm) => form.append("algorithms", algorithm));
  const { data } = await api.post<HashResult>("/hash", form, toConfig(onProgress));
  return data;
}
