import { api, toConfig, type ProgressCallback } from "./http";
import type { MimeResult } from "@/types";

export async function verifyMime(file: File, onProgress?: ProgressCallback) {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<MimeResult>("/mime/verify", form, toConfig(onProgress));
  return data;
}
