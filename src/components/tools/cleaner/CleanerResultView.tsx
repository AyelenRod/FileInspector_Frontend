"use client";

import { SuccessAlert } from "@/components/shared/ErrorAlert";
import type { useMetadataCleaner } from "@/hooks/useMetadataCleaner";
import type { CleanMetadataResult } from "@/types";
import { CleanOutputPreview } from "./CleanOutputPreview";
import { ProcessedInputCard } from "./ProcessedInputCard";
import { SanitizationResultCard } from "./SanitizationResultCard";

type CleanerState = ReturnType<typeof useMetadataCleaner>;

interface CleanerResultViewProps {
  cleaner: CleanerState;
  data: CleanMetadataResult;
}

export function CleanerResultView({ cleaner, data }: CleanerResultViewProps) {
  return (
    <>
      <SuccessAlert
        title="Listo. Tu imagen ya no contiene metadatos."
        message="Se purgaron todas las trazas de geolocalización, cámara y software embebidas."
      />
      <div className="grid gap-5 md:grid-cols-2">
        <ProcessedInputCard
          filename={cleaner.file?.name}
          originalSize={data.originalSize}
          onChangeImage={cleaner.clearFile}
        />
        <CleanOutputPreview previewUrl={cleaner.previewUrl} width={data.width} height={data.height} />
      </div>
      <SanitizationResultCard
        data={data}
        bytesSaved={cleaner.bytesSaved}
        percentSaved={cleaner.percentSaved}
        onClean={cleaner.clearFile}
      />
    </>
  );
}
