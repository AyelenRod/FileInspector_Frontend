"use client";

import { Card } from "@heroui/react";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { MAX_COMBINED_SIZE_MB } from "@/lib/limits";

interface FileSlotProps {
  name: string;
  file: File | null;
  isLoading: boolean;
  progress: number;
  onSelect: (file: File) => void;
  onClear: () => void;
}

export function FileSlot({ name, file, isLoading, progress, onSelect, onClear }: FileSlotProps) {
  return (
    <Card>
      <Card.Content className="flex flex-col gap-3">
        <div className="flex justify-between text-sm font-semibold">
          Archivo {name}
          <span className="text-xs font-normal text-muted">{file ? "Cargado" : "Esperando archivo"}</span>
        </div>
        <FileDropzone
          initialFile={file}
          maxSizeMB={MAX_COMBINED_SIZE_MB}
          label="Arrastra un archivo aquí o haz clic"
          hint="Cualquier formato compatible"
          isUploading={isLoading}
          progress={progress}
          onFilesSelected={(files) => onSelect(files[0])}
          onClear={onClear}
        />
      </Card.Content>
    </Card>
  );
}
