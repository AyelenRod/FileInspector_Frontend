"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { PrivacyNote, ToolPage } from "@/components/shared/ToolPage";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { MetadataViewer, MetadataViewerSkeleton } from "@/components/tools/MetadataViewer";
import { useToolRequest } from "@/hooks/useToolRequest";
import { extractMetadata } from "@/services/tools.service";
import { TOOLS } from "@/lib/tools";
import type { MetadataResult } from "@/types";

export default function MetadatosExtractorPage() {
  const [file, setFile] = useState<File | null>(null);
  const { data, error, isLoading, progress, run, reset } = useToolRequest<MetadataResult>();

  return (
    <ToolPage tool={TOOLS[0]}>
      <FileDropzone
        accept={{ "image/*": [".jpg", ".jpeg", ".png", ".tiff", ".tif", ".heic"] }}
        maxSizeMB={10}
        label="Arrastra una imagen aquí o haz clic para seleccionar"
        hint="Formatos: JPEG, PNG, TIFF, HEIC · Máximo 10 MB"
        isUploading={isLoading}
        progress={progress}
        onFilesSelected={(f) => {
          setFile(f[0]);
          reset();
        }}
        onClear={() => {
          setFile(null);
          reset();
        }}
      />
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
