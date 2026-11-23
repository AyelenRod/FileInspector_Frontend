"use client";

import { Skeleton } from "@heroui/react";
import { ToolPage } from "@/components/shared/ToolPage";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { BinaryDiffViewer } from "@/components/tools/compare/BinaryDiffViewer";
import { ComparisonActions } from "@/components/tools/compare/ComparisonActions";
import { ComparisonInputs } from "@/components/tools/compare/ComparisonInputs";
import { useBinaryComparison } from "@/hooks/useBinaryComparison";
import { getTool } from "@/lib/tools";

export default function ComparadorBinarioPage() {
  const comparison = useBinaryComparison();

  return (
    <ToolPage tool={getTool("comparador-binario")} wide>
      {comparison.data ? (
        <BinaryDiffViewer data={comparison.data} onReset={comparison.clearAll} />
      ) : (
        <>
          <ComparisonInputs comparison={comparison} />
          <ComparisonActions
            canCompare={comparison.canCompare}
            combinedTooBig={comparison.combinedTooBig}
            isLoading={comparison.isLoading}
            onCompare={comparison.compare}
          />
          <ErrorAlert message={comparison.error} />
          {comparison.isLoading && <Skeleton className="h-48 w-full rounded-2xl" />}
        </>
      )}
    </ToolPage>
  );
}
