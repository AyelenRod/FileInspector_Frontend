"use client";

import { FileDropzone } from "./FileDropzone";
import { IMAGE_ACCEPT } from "@/lib/file-types";
import { MAX_IMAGE_SIZE_MB } from "@/lib/limits";

interface ImageDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onClear: () => void;
  isUploading: boolean;
  progress: number;
}

export function ImageDropzone({ onFilesSelected, onClear, isUploading, progress }: ImageDropzoneProps) {
  return (
    <FileDropzone
      accept={IMAGE_ACCEPT}
      maxSizeMB={MAX_IMAGE_SIZE_MB}
      label="Arrastra una imagen aquí o haz clic para seleccionar"
      hint={`Formatos: JPEG, PNG, TIFF, HEIC · Máximo ${MAX_IMAGE_SIZE_MB} MB`}
      isUploading={isUploading}
      progress={progress}
      onFilesSelected={onFilesSelected}
      onClear={onClear}
    />
  );
}
