"use client";

import { useState } from "react";
import { useToolRequest } from "./useToolRequest";
import { compareFiles } from "@/services/compare.service";
import { BYTES_PER_MB, MAX_COMBINED_SIZE_MB } from "@/lib/limits";
import type { BinaryDiffResult } from "@/types";

export type FileSlotName = "A" | "B";

export function useBinaryComparison() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [swapKey, setSwapKey] = useState(0);
  const { data, error, isLoading, progress, run, reset } = useToolRequest<BinaryDiffResult>();

  const combinedTooBig =
    !!fileA && !!fileB && fileA.size + fileB.size > MAX_COMBINED_SIZE_MB * BYTES_PER_MB;

  const setFile = (slot: FileSlotName, file: File | null) => {
    (slot === "A" ? setFileA : setFileB)(file);
    reset();
  };

  const swapFiles = () => {
    setFileA(fileB);
    setFileB(fileA);
    setSwapKey((k) => k + 1);
  };

  const clearAll = () => {
    setFileA(null);
    setFileB(null);
    setSwapKey((k) => k + 1);
    reset();
  };

  const compare = () => {
    if (fileA && fileB) run((p) => compareFiles(fileA, fileB, p));
  };

  return {
    fileA,
    fileB,
    swapKey,
    combinedTooBig,
    canCompare: !!fileA && !!fileB && !isLoading && !combinedTooBig,
    setFile,
    swapFiles,
    clearAll,
    compare,
    data,
    error,
    isLoading,
    progress,
  };
}
