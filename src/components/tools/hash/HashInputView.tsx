"use client";

import type { useHashCalculator } from "@/hooks/useHashCalculator";
import { HashInputCard } from "./HashInputCard";
import { HashResultsPlaceholder } from "./HashResultsPlaceholder";

type CalculatorState = ReturnType<typeof useHashCalculator>;

export function HashInputView({ calculator }: { calculator: CalculatorState }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <HashInputCard calculator={calculator} />
      <HashResultsPlaceholder isLoading={calculator.isLoading} selected={calculator.selected} />
    </div>
  );
}
