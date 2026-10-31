"use client";

import { useCallback, useRef, useState } from "react";
import { getErrorMessage, isCancel, type ProgressCallback } from "@/services/tools.service";

/** Estado común de las herramientas: carga, progreso, error y resultado. */
export function useToolRequest<T>() {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const controller = useRef<AbortController | null>(null);

  const cancel = useCallback(() => controller.current?.abort(), []);

  const run = useCallback(async (request: (onProgress: ProgressCallback, signal: AbortSignal) => Promise<T>) => {
    controller.current = new AbortController();
    setIsLoading(true);
    setError(null);
    setData(null);
    setProgress(0);
    try {
      const result = await request(setProgress, controller.current.signal);
      setData(result);
      return result;
    } catch (e) {
      if (!isCancel(e)) setError(getErrorMessage(e));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setProgress(0);
  }, []);

  return { data, error, isLoading, progress, run, reset, cancel };
}
