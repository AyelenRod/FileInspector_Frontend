"use client";

import { Button } from "@heroui/react";
import { ToolPage } from "@/components/shared/ToolPage";
import { PrivacyNote } from "@/components/shared/PrivacyNote";
import { ImageDropzone } from "@/components/shared/ImageDropzone";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { MetadataViewer } from "@/components/tools/metadata/MetadataViewer";
import { MetadataViewerSkeleton } from "@/components/tools/metadata/MetadataViewerSkeleton";
import { useFileTool } from "@/hooks/useFileTool";
import { extractMetadata } from "@/services/metadata.service";
import { getTool } from "@/lib/tools";
import type { MetadataResult } from "@/types";

export default function MetadatosExtractorPage() {
  const { file, selectFile, clearFile, data, error, isLoading, progress, run } = useFileTool<MetadataResult>();

  return (
    <ToolPage tool={getTool("metadatos-extractor")}>
      <ImageDropzone onFilesSelected={selectFile} onClear={clearFile} isUploading={isLoading} progress={progress} />
      <Button isDisabled={!file || isLoading} onPress={() => file && run((p) => extractMetadata(file, p))}>
        Extraer metadatos
      </Button>
      <PrivacyNote />
      <ErrorAlert message={error} />
      {isLoading && progress >= 100 && <MetadataViewerSkeleton />}
      {data && <MetadataViewer data={data} />}
    </ToolPage>
  );
}
