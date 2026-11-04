import { api, toConfig, type ProgressCallback } from "./http";
import type { BinaryDiffResult } from "@/types";

export async function compareFiles(fileA: File, fileB: File, onProgress?: ProgressCallback) {
  const form = new FormData();
  form.append("file_a", fileA);
  form.append("file_b", fileB);
  const { data } = await api.post<BinaryDiffResult>("/compare", form, toConfig(onProgress));
  return data;
}
