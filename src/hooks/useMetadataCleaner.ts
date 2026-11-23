"use client";

import { useFileTool } from "./useFileTool";
import { useObjectUrl } from "./useObjectUrl";
import { cleanMetadata } from "@/services/metadata.service";
import type { CleanMetadataResult } from "@/types";

export function useMetadataCleaner() {
  const { file, selectFile, clearFile, data, error, isLoading, progress, run, cancel } =
    useFileTool<CleanMetadataResult>();
  const previewUrl = useObjectUrl(data?.blob);

  const submit = () => {
    if (file) run((p, s) => cleanMetadata(file, p, s));
  };

  const bytesSaved = data ? data.originalSize - data.cleanSize : 0;
  const percentSaved = data && data.originalSize ? (bytesSaved / data.originalSize) * 100 : 0;

  return {
    file,
    selectFile,
    clearFile,
    submit,
    cancel,
    data,
    error,
    isLoading,
    progress,
    previewUrl,
    bytesSaved,
    percentSaved,
  };
}
