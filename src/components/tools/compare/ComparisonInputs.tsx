"use client";

import type { useBinaryComparison } from "@/hooks/useBinaryComparison";
import { FileSlot } from "./FileSlot";
import { SwapFilesButton } from "./SwapFilesButton";

type ComparisonState = ReturnType<typeof useBinaryComparison>;

export function ComparisonInputs({ comparison }: { comparison: ComparisonState }) {
  const { fileA, fileB, swapKey, isLoading, progress, setFile, swapFiles } = comparison;

  return (
    <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
      <div key={`A-${swapKey}`}>
        <FileSlot
          name="A"
          file={fileA}
          isLoading={isLoading}
          progress={0}
          onSelect={(file) => setFile("A", file)}
          onClear={() => setFile("A", null)}
        />
      </div>
      <SwapFilesButton isDisabled={isLoading || (!fileA && !fileB)} onSwap={swapFiles} />
      <div key={`B-${swapKey}`} className="md:order-3">
        <FileSlot
          name="B"
          file={fileB}
          isLoading={isLoading}
          progress={progress}
          onSelect={(file) => setFile("B", file)}
          onClear={() => setFile("B", null)}
        />
      </div>
    </div>
  );
}
