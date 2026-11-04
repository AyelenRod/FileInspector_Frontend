"use client";

import { useCallback, useState } from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { FileIcon, UploadCloud, X } from "lucide-react";
import { Button, ProgressBar } from "@heroui/react";
import { formatBytes } from "@/lib/tools";
import { ErrorAlert } from "./ErrorAlert";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onClear?: () => void;
  accept?: Accept;
  maxSizeMB: number;
  /** Progreso de subida 0-100; la barra aparece con isUploading. */
  progress?: number;
  isUploading?: boolean;
  disabled?: boolean;
  /** Archivo ya seleccionado (para restaurar al remontar). */
  initialFile?: File | null;
  /** Texto principal, p. ej. "Arrastra una imagen aquí o haz clic para seleccionar". */
  label: string;
  /** Línea secundaria, p. ej. "Formatos: JPEG, PNG · Máximo 10 MB". */
  hint: string;
}

function rejectionMessage(rejections: FileRejection[], maxSizeMB: number): string {
  const codes = new Set(rejections.flatMap((r) => r.errors.map((e) => e.code)));
  if (codes.has("file-too-large")) return `El archivo supera el límite de ${maxSizeMB} MB.`;
  if (codes.has("file-invalid-type")) return "El formato de archivo no está permitido en esta herramienta.";
  if (codes.has("too-many-files")) return "Solo puedes seleccionar un archivo.";
  return rejections[0]?.errors[0]?.message ?? "Archivo no válido.";
}

export function FileDropzone({
  onFilesSelected,
  onClear,
  accept,
  maxSizeMB,
  progress = 0,
  isUploading = false,
  disabled = false,
  initialFile = null,
  label,
  hint,
}: FileDropzoneProps) {
  const [file, setFile] = useState<File | null>(initialFile);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length) {
        setError(rejectionMessage(rejected, maxSizeMB));
        return;
      }
      setError(null);
      setFile(accepted[0]);
      onFilesSelected(accepted);
    },
    [maxSizeMB, onFilesSelected],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    maxFiles: 1,
    maxSize: maxSizeMB * 1024 * 1024,
    disabled: disabled || isUploading,
  });

  const clear = () => {
    setFile(null);
    setError(null);
    onClear?.();
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-6 py-10 text-center transition-colors ${
          isDragActive ? "border-danger bg-accent/10" : "border-separator bg-surface hover:border-muted"
        } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      >
        <input {...getInputProps()} aria-label={label} />
        <span className="flex size-10 items-center justify-center rounded-lg bg-accent/20 text-danger">
          <UploadCloud className="size-5" aria-hidden />
        </span>
        <p className="text-sm font-semibold">{isDragActive ? "Suelta el archivo…" : label}</p>
        <p className="text-xs text-muted">{hint}</p>
      </div>

      {error && <ErrorAlert message={error} />}

      {file && (
        <div className="flex items-center gap-3 rounded-xl border border-separator bg-surface px-4 py-3">
          <FileIcon className="size-5 shrink-0 text-muted" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-sm font-medium">{file.name}</span>
          <span className="text-xs text-muted">{formatBytes(file.size)}</span>
          <Button isIconOnly size="sm" variant="ghost" aria-label={`Quitar ${file.name}`} onPress={clear} isDisabled={isUploading}>
            <X className="size-4" />
          </Button>
        </div>
      )}

      {isUploading && (
        <ProgressBar aria-label="Progreso de subida" value={progress}>
          <ProgressBar.Output />
          <ProgressBar.Track>
            <ProgressBar.Fill />
          </ProgressBar.Track>
        </ProgressBar>
      )}
    </div>
  );
}
