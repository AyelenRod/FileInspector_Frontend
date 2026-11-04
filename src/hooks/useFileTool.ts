"use client";

import { useCallback, useState } from "react";
import { useToolRequest } from "./useToolRequest";

export function useFileTool<T>() {
  const [file, setFile] = useState<File | null>(null);
  const request = useToolRequest<T>();
  const { reset } = request;

  const selectFile = useCallback(
    (files: File[]) => {
      setFile(files[0]);
      reset();
    },
    [reset],
  );

  const clearFile = useCallback(() => {
    setFile(null);
    reset();
  }, [reset]);

  return { file, selectFile, clearFile, ...request };
}
