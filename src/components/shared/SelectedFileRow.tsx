import { FileIcon, X } from "lucide-react";
import { Button } from "@heroui/react";
import { formatBytes } from "@/lib/format";

interface SelectedFileRowProps {
  file: File;
  onClear: () => void;
  isDisabled: boolean;
}

export function SelectedFileRow({ file, onClear, isDisabled }: SelectedFileRowProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-separator bg-surface px-4 py-3">
      <FileIcon className="size-5 shrink-0 text-muted" aria-hidden />
      <span className="min-w-0 flex-1 truncate text-sm font-medium">{file.name}</span>
      <span className="text-xs text-muted">{formatBytes(file.size)}</span>
      <Button isIconOnly size="sm" variant="ghost" aria-label={`Quitar ${file.name}`} onPress={onClear} isDisabled={isDisabled}>
        <X className="size-4" />
      </Button>
    </div>
  );
}
