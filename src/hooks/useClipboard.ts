"use client";

import { useCallback, useState } from "react";

const FEEDBACK_MS = 2000;

export function useClipboard() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copy = useCallback(async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), FEEDBACK_MS);
    } catch {
      setCopiedKey(null);
    }
  }, []);

  return { copiedKey, copy };
}
