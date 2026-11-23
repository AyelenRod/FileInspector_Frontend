"use client";

import { Button, Spinner } from "@heroui/react";
import { GitCompare } from "lucide-react";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { PrivacyNote } from "@/components/shared/PrivacyNote";
import { MAX_COMBINED_SIZE_MB } from "@/lib/limits";

interface ComparisonActionsProps {
  canCompare: boolean;
  combinedTooBig: boolean;
  isLoading: boolean;
  onCompare: () => void;
}

export function ComparisonActions({ canCompare, combinedTooBig, isLoading, onCompare }: ComparisonActionsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-muted">Límite combinado: {MAX_COMBINED_SIZE_MB} MB</p>
      {combinedTooBig && (
        <ErrorAlert message={`Entre los dos archivos superan el límite combinado de ${MAX_COMBINED_SIZE_MB} MB.`} />
      )}
      <Button isDisabled={!canCompare} onPress={onCompare}>
        {isLoading ? <Spinner size="sm" /> : <GitCompare className="size-4" aria-hidden />}
        Comparar archivos
      </Button>
      <PrivacyNote>Los archivos se procesan en memoria y no se guardan.</PrivacyNote>
    </div>
  );
}
