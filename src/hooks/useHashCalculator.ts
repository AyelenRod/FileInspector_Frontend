"use client";

import { useFileTool } from "./useFileTool";
import { calculateHash } from "@/services/hash.service";
import type { HashResult } from "@/types";

export function useHashCalculator() {
  const { file, selectFile, clearFile, data, error, isLoading, progress, run } = useFileTool<HashResult>();

  const submit = () => {
    if (file) run((p) => calculateHash(file, p));
  };

  return {
    selectFile,
    clearFile,
    canSubmit: !!file,
    submit,
    startOver: clearFile,
    data,
    error,
    isLoading,
    progress,
  };
}
