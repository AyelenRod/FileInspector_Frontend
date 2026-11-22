"use client";

import { ToolPage } from "@/components/shared/ToolPage";
import { CleanerInputView } from "@/components/tools/cleaner/CleanerInputView";
import { CleanerResultView } from "@/components/tools/cleaner/CleanerResultView";
import { useMetadataCleaner } from "@/hooks/useMetadataCleaner";
import { getTool } from "@/lib/tools";

export default function MetadatosLimpiadorPage() {
  const cleaner = useMetadataCleaner();

  return (
    <ToolPage tool={getTool("metadatos-limpiador")}>
      {cleaner.data ? (
        <CleanerResultView cleaner={cleaner} data={cleaner.data} />
      ) : (
        <CleanerInputView cleaner={cleaner} />
      )}
    </ToolPage>
  );
}
