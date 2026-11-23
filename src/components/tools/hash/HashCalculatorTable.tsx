"use client";

import { useClipboard } from "@/hooks/useClipboard";
import { ALGORITHMS } from "@/lib/hash-algorithms";
import type { HashResult } from "@/types";
import { HashValueCard } from "./HashValueCard";

export function HashCalculatorTable({ data }: { data: HashResult }) {
  const { copiedKey, copy } = useClipboard();

  return (
    <div className="flex flex-col gap-4">
      {ALGORITHMS.map((algorithm) => {
        const value = data.hashes[algorithm.key];
        if (!value) return null;
        return (
          <HashValueCard
            key={algorithm.key}
            algorithm={algorithm}
            value={value}
            isCopied={copiedKey === algorithm.key}
            onCopy={() => copy(algorithm.key, value)}
          />
        );
      })}
    </div>
  );
}
