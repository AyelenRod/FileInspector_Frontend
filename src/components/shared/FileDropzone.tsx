"use client";

import { useCallback, useState } from "react";
import { useDropzone, type Accept, type FileRejection } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { BYTES_PER_MB } from "@/lib/limits";
import { rejectionMessage } from "@/lib/file-rejection";
import { ErrorAlert } from "./ErrorAlert";
import { SelectedFileRow } from "./SelectedFileRow";
import { UploadProgress } from "./UploadProgress";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  onClear?: () => void;
  accept?: Accept;
  maxSizeMB: number;
  progress?: number;
  isUploading?: boolean;
  disabled?: boolean;
  initialFile?: File | null;
  label: string;
  hint: string;
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
    maxSize: maxSizeMB * BYTES_PER_MB,
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
      {file && <SelectedFileRow file={file} onClear={clear} isDisabled={isUploading} />}
      {isUploading && <UploadProgress value={progress} />}
    </div>
  );
}
