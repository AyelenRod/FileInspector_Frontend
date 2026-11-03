"use client";

import { useState } from "react";
import { Button, Card, Skeleton, Spinner } from "@heroui/react";
import { ShieldCheck } from "lucide-react";
import { PrivacyNote, ToolPage } from "@/components/shared/ToolPage";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { MimeResultCard } from "@/components/tools/MimeResultCard";
import { useToolRequest } from "@/hooks/useToolRequest";
import { verifyMime } from "@/services/tools.service";
import { TOOLS } from "@/lib/tools";
import type { MimeResult } from "@/types";

const RECOGNIZED = ["Imágenes (JPEG, PNG, GIF, WEBP, TIFF, BMP)", "PDF (%PDF-)", "ZIP (incluyendo OOXML y derivados)", "Ejecutables (PE, ELF)", "Documentos Office (DOCX, XLSX, PPTX, ODF)"];

export default function VerificadorMimePage() {
  const [file, setFile] = useState<File | null>(null);
  const { data, error, isLoading, progress, run, reset } = useToolRequest<MimeResult>();

  const clear = () => {
    setFile(null);
    reset();
  };

  return (
    <ToolPage tool={TOOLS[2]}>
      {data ? (
        <MimeResultCard data={data} onReset={clear} />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <Card>
            <Card.Content className="flex flex-col gap-4">
              <FileDropzone
                maxSizeMB={50}
                label="Arrastra un archivo aquí o haz clic para seleccionar"
                hint="Cualquier extensión o archivo binario · Máximo 50 MB"
                isUploading={isLoading}
                progress={progress}
                onFilesSelected={(f) => {
                  setFile(f[0]);
                  reset();
                }}
                onClear={clear}
              />
              <Button isDisabled={!file || isLoading} onPress={() => file && run((p) => verifyMime(file, p))}>
                {isLoading ? <Spinner size="sm" /> : <ShieldCheck className="size-4" aria-hidden />}
                Verificar archivo
              </Button>
              <ErrorAlert message={error} />
              {isLoading && progress >= 100 && <Skeleton className="h-16 w-full rounded-xl" />}
            </Card.Content>
          </Card>
          <Card>
            <Card.Header>
              <Card.Title className="text-base">Tipos reconocidos</Card.Title>
              <Card.Description>Inspección de firmas binarias (magic bytes) soportadas</Card.Description>
            </Card.Header>
            <Card.Content className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {RECOGNIZED.map((r) => (
                  <span key={r} className="rounded-md bg-default px-2 py-1 text-xs text-muted">{r}</span>
                ))}
              </div>
              <PrivacyNote>El archivo se analiza en memoria y no se guarda.</PrivacyNote>
            </Card.Content>
          </Card>
        </div>
      )}
    </ToolPage>
  );
}
