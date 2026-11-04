"use client";

import { Button, Card, Spinner } from "@heroui/react";
import { Fingerprint } from "lucide-react";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { FileDropzone } from "@/components/shared/FileDropzone";
import type { useHashCalculator } from "@/hooks/useHashCalculator";
import { MAX_FILE_SIZE_MB } from "@/lib/limits";
import { AlgorithmSelector } from "./AlgorithmSelector";
import { HashSourceToggle } from "./HashSourceToggle";
import { HashTextInput } from "./HashTextInput";

type CalculatorState = ReturnType<typeof useHashCalculator>;

export function HashInputCard({ calculator }: { calculator: CalculatorState }) {
  const { mode, isLoading } = calculator;

  return (
    <Card>
      <Card.Content className="flex flex-col gap-5">
        <HashSourceToggle mode={mode} onChange={calculator.changeMode} />

        {mode === "file" ? (
          <FileDropzone
            maxSizeMB={MAX_FILE_SIZE_MB}
            label="Arrastra un archivo aquí o haz clic para seleccionar"
            hint={`Cualquier formato · Máximo ${MAX_FILE_SIZE_MB} MB`}
            isUploading={isLoading}
            progress={calculator.progress}
            onFilesSelected={calculator.selectFile}
            onClear={calculator.clearFile}
          />
        ) : (
          <HashTextInput value={calculator.text} onChange={calculator.setText} />
        )}

        <AlgorithmSelector selected={calculator.selected} onToggle={calculator.toggleAlgorithm} />

        <Button isDisabled={!calculator.canSubmit || isLoading} onPress={calculator.submit}>
          {isLoading ? <Spinner size="sm" /> : <Fingerprint className="size-4" aria-hidden />}
          Calcular hash
        </Button>
        <ErrorAlert message={calculator.error} />
      </Card.Content>
    </Card>
  );
}
