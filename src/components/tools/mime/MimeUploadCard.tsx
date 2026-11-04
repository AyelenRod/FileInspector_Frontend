"use client";

import { Button, Card, Skeleton, Spinner } from "@heroui/react";
import { ShieldCheck } from "lucide-react";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { MAX_FILE_SIZE_MB } from "@/lib/limits";

interface MimeUploadCardProps {
  canSubmit: boolean;
  isLoading: boolean;
  progress: number;
  error: string | null;
  onFilesSelected: (files: File[]) => void;
  onClear: () => void;
  onSubmit: () => void;
}

export function MimeUploadCard({
  canSubmit,
  isLoading,
  progress,
  error,
  onFilesSelected,
  onClear,
  onSubmit,
}: MimeUploadCardProps) {
  return (
    <Card>
      <Card.Content className="flex flex-col gap-4">
        <FileDropzone
          maxSizeMB={MAX_FILE_SIZE_MB}
          label="Arrastra un archivo aquí o haz clic para seleccionar"
          hint={`Cualquier extensión o archivo binario · Máximo ${MAX_FILE_SIZE_MB} MB`}
          isUploading={isLoading}
          progress={progress}
          onFilesSelected={onFilesSelected}
          onClear={onClear}
        />
        <Button isDisabled={!canSubmit || isLoading} onPress={onSubmit}>
          {isLoading ? <Spinner size="sm" /> : <ShieldCheck className="size-4" aria-hidden />}
          Verificar archivo
        </Button>
        <ErrorAlert message={error} />
        {isLoading && progress >= 100 && <Skeleton className="h-16 w-full rounded-xl" />}
      </Card.Content>
    </Card>
  );
}
