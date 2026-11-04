"use client";

import { Card } from "@heroui/react";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { ImageDropzone } from "@/components/shared/ImageDropzone";
import type { useMetadataCleaner } from "@/hooks/useMetadataCleaner";
import { CleanerActions } from "./CleanerActions";
import { CleanerPreviewPlaceholder } from "./CleanerPreviewPlaceholder";
import { OutputFormatSelector } from "./OutputFormatSelector";

type CleanerState = ReturnType<typeof useMetadataCleaner>;

export function CleanerInputView({ cleaner }: { cleaner: CleanerState }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
      <Card>
        <Card.Content className="flex flex-col gap-5">
          <ImageDropzone
            onFilesSelected={cleaner.selectFile}
            onClear={cleaner.clearFile}
            isUploading={cleaner.isLoading}
            progress={cleaner.progress}
          />
          <OutputFormatSelector value={cleaner.format} onChange={cleaner.setFormat} disabled={cleaner.isLoading} />
          <CleanerActions
            canSubmit={!!cleaner.file}
            isLoading={cleaner.isLoading}
            onSubmit={cleaner.submit}
            onCancel={cleaner.cancel}
          />
          <ErrorAlert message={cleaner.error} />
        </Card.Content>
      </Card>
      <CleanerPreviewPlaceholder />
    </div>
  );
}
