"use client";

import { ToolPage } from "@/components/shared/ToolPage";
import { HashInputView } from "@/components/tools/hash/HashInputView";
import { HashResultView } from "@/components/tools/hash/HashResultView";
import { useHashCalculator } from "@/hooks/useHashCalculator";
import { getTool } from "@/lib/tools";

export default function CalculadoraHashPage() {
  const calculator = useHashCalculator();

  return (
    <ToolPage tool={getTool("calculadora-hash")}>
      {calculator.data ? (
        <HashResultView data={calculator.data} onReset={calculator.startOver} />
      ) : (
        <HashInputView calculator={calculator} />
      )}
    </ToolPage>
  );
}
