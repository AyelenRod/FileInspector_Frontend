"use client";

import { useState } from "react";
import { Button, Card, Skeleton, Spinner } from "@heroui/react";
import { ArrowLeftRight, GitCompare } from "lucide-react";
import { PrivacyNote, ToolPage } from "@/components/shared/ToolPage";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { BinaryDiffViewer } from "@/components/tools/BinaryDiffViewer";
import { useToolRequest } from "@/hooks/useToolRequest";
import { compareFiles } from "@/services/tools.service";
import { TOOLS } from "@/lib/tools";
import type { BinaryDiffResult } from "@/types";

const MAX_COMBINED_MB = 20;

export default function ComparadorBinarioPage() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  // Cambia al intercambiar para remontar los dropzones con su archivo nuevo.
  const [swapKey, setSwapKey] = useState(0);
  const { data, error, isLoading, progress, run, reset } = useToolRequest<BinaryDiffResult>();

  const combinedTooBig = !!fileA && !!fileB && fileA.size + fileB.size > MAX_COMBINED_MB * 1024 * 1024;

  const clearAll = () => {
    setFileA(null);
    setFileB(null);
    setSwapKey((k) => k + 1);
    reset();
  };

  return (
    <ToolPage tool={TOOLS[4]} wide>
      {data ? (
        <BinaryDiffViewer data={data} onReset={clearAll} />
      ) : (
        <>
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
            {([["A", fileA, setFileA], ["B", fileB, setFileB]] as const).map(([name, current, setter], i) => (
              <div key={`${name}-${swapKey}`} className={i === 1 ? "md:order-3" : ""}>
                <Card>
                  <Card.Content className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm font-semibold">
                      Archivo {name}
                      <span className="text-xs font-normal text-muted">
                        {current ? "Cargado" : "Esperando archivo"}
                      </span>
                    </div>
                    <FileDropzone
                      initialFile={current}
                      maxSizeMB={MAX_COMBINED_MB}
                      label="Arrastra un archivo aquí o haz clic"
                      hint="Cualquier formato compatible"
                      isUploading={isLoading}
                      progress={name === "B" ? progress : 0}
                      onFilesSelected={(f) => {
                        setter(f[0]);
                        reset();
                      }}
                      onClear={() => {
                        setter(null);
                        reset();
                      }}
                    />
                  </Card.Content>
                </Card>
              </div>
            ))}
            <div className="flex justify-center md:order-2">
              <Button
                isIconOnly
                variant="secondary"
                aria-label="Intercambiar archivos"
                isDisabled={isLoading || (!fileA && !fileB)}
                onPress={() => {
                  setFileA(fileB);
                  setFileB(fileA);
                  setSwapKey((k) => k + 1);
                }}
              >
                <ArrowLeftRight className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <p className="text-xs text-muted">Límite combinado: {MAX_COMBINED_MB} MB</p>
            {combinedTooBig && (
              <ErrorAlert message={`Entre los dos archivos superan el límite combinado de ${MAX_COMBINED_MB} MB.`} />
            )}
            <Button
              isDisabled={!fileA || !fileB || isLoading || combinedTooBig}
              onPress={() => fileA && fileB && run((p) => compareFiles(fileA, fileB, p))}
            >
              {isLoading ? <Spinner size="sm" /> : <GitCompare className="size-4" aria-hidden />}
              Comparar archivos
            </Button>
            <PrivacyNote>Los archivos se procesan en memoria y no se guardan.</PrivacyNote>
          </div>
          <ErrorAlert message={error} />
          {isLoading && <Skeleton className="h-48 w-full rounded-2xl" />}
        </>
      )}
    </ToolPage>
  );
}
