import { ProgressBar } from "@heroui/react";

export function UploadProgress({ value }: { value: number }) {
  return (
    <ProgressBar aria-label="Progreso de subida" value={value}>
      <ProgressBar.Output />
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}
