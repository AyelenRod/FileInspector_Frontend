"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button, Card, Spinner } from "@heroui/react";
import { Check, Download, EyeOff, Info, RotateCcw, Sparkles } from "lucide-react";
import { PrivacyNote, ToolPage } from "@/components/shared/ToolPage";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { ErrorAlert, SuccessAlert } from "@/components/shared/ErrorAlert";
import { useToolRequest } from "@/hooks/useToolRequest";
import { cleanMetadata, downloadBlob } from "@/services/tools.service";
import { TOOLS, formatBytes } from "@/lib/tools";
import type { CleanMetadataResult, CleanOutputFormat } from "@/types";

const FORMATS: { value: CleanOutputFormat; title: string; desc: string }[] = [
  { value: "jpeg", title: "JPEG", desc: "Ideal para web y fotos" },
  { value: "png", title: "PNG", desc: "Preserva gráficos y transparencias" },
];

export default function MetadatosLimpiadorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState<CleanOutputFormat>("jpeg");
  const { data, error, isLoading, progress, run, reset, cancel } = useToolRequest<CleanMetadataResult>();
  const previewUrl = useMemo(() => (data ? URL.createObjectURL(data.blob) : null), [data]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const clear = () => {
    setFile(null);
    reset();
  };

  const saved = data ? data.originalSize - data.cleanSize : 0;
  const savedPct = data && data.originalSize ? (saved / data.originalSize) * 100 : 0;

  return (
    <ToolPage tool={TOOLS[1]}>
      {!data ? (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <Card>
            <Card.Content className="flex flex-col gap-5">
              <FileDropzone
                accept={{ "image/*": [".jpg", ".jpeg", ".png", ".tiff", ".tif", ".heic"] }}
                maxSizeMB={10}
                label="Arrastra una imagen aquí o haz clic para seleccionar"
                hint="Formatos: JPEG, PNG, TIFF, HEIC · Máximo 10 MB"
                isUploading={isLoading}
                progress={progress}
                onFilesSelected={(f) => {
                  setFile(f[0]);
                  reset();
                }}
                onClear={clear}
              />
              <fieldset className="flex flex-col gap-2" disabled={isLoading}>
                <legend className="mb-2 text-sm font-semibold">Formato de salida</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {FORMATS.map((f) => (
                    <label
                      key={f.value}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
                        format === f.value ? "border-danger bg-accent/10" : "border-separator"
                      }`}
                    >
                      <input
                        type="radio"
                        name="output_format"
                        value={f.value}
                        checked={format === f.value}
                        onChange={() => setFormat(f.value)}
                        className="accent-[#E04B72]"
                      />
                      <span>
                        <span className="block text-sm font-semibold">{f.title}</span>
                        <span className="block text-xs text-muted">{f.desc}</span>
                      </span>
                    </label>
                  ))}
                </div>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <Info className="size-3.5" aria-hidden />
                  El formato es obligatorio porque la imagen se reconstruye sin metadatos.
                </p>
              </fieldset>
              <div className="flex gap-2">
                <Button
                  fullWidth
                  isDisabled={!file || isLoading}
                  onPress={() => file && run((p, s) => cleanMetadata(file, format, p, s))}
                >
                  {isLoading ? <Spinner size="sm" /> : <Sparkles className="size-4" aria-hidden />}
                  {isLoading ? "Procesando…" : "Limpiar imagen"}
                </Button>
                {isLoading && (
                  <Button variant="secondary" onPress={cancel}>Cancelar</Button>
                )}
              </div>
              <ErrorAlert message={error} />
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="flex h-full flex-col gap-4">
              <p className="text-sm font-semibold">Vista previa</p>
              <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-separator p-8 text-center text-sm text-muted">
                <EyeOff className="size-6" aria-hidden />
                Aún no has seleccionado una imagen
              </div>
              <PrivacyNote>Tu imagen se procesa en memoria y no se guarda.</PrivacyNote>
            </Card.Content>
          </Card>
        </div>
      ) : (
        <>
          <SuccessAlert
            title="Listo. Tu imagen ya no contiene metadatos."
            message="Se purgaron todas las trazas de geolocalización, cámara y software embebidas."
          />
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <Card.Header><Card.Title className="text-xs uppercase text-muted">Entrada procesada</Card.Title></Card.Header>
              <Card.Content className="flex flex-col gap-4">
                <div className="rounded-xl border border-separator p-3">
                  <p className="break-all text-sm font-semibold">{file?.name}</p>
                  <p className="text-xs text-muted">Original: {formatBytes(data.originalSize)}</p>
                </div>
                <Button variant="secondary" onPress={clear}>
                  <RotateCcw className="size-4" /> Cambiar imagen
                </Button>
              </Card.Content>
            </Card>
            <Card>
              <Card.Header>
                <Card.Title className="text-xs uppercase text-muted">Vista previa de salida</Card.Title>
                {data.width && data.height && (
                  <Card.Description>{data.width} × {data.height} px</Card.Description>
                )}
              </Card.Header>
              <Card.Content>
                {previewUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="Imagen limpia" className="max-h-48 w-full rounded-xl object-contain" />
                )}
              </Card.Content>
            </Card>
          </div>

          <Card>
            <Card.Content className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold">Resultado del saneamiento</h2>
                <div className="flex items-center gap-3 text-xs">
                  <span className="rounded-lg border border-separator px-3 py-1.5">Tamaño original: {formatBytes(data.originalSize)}</span>
                  <span className="rounded-lg border border-separator px-3 py-1.5">Tamaño limpio: {formatBytes(data.cleanSize)}</span>
                  <span className="rounded-lg bg-accent px-3 py-1.5 font-semibold text-accent-foreground">
                    {saved >= 0 ? "Ahorro" : "Aumento"}: {formatBytes(Math.abs(saved))} · {Math.abs(savedPct).toFixed(1)}%
                  </span>
                </div>
              </div>

              {data.removedBlocks.length > 0 && (
                <div>
                  <p className="mb-2 text-xs text-muted">Bloques de metadatos eliminados con éxito</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
                    {data.removedBlocks.map((b) => (
                      <div key={b} className="flex items-center justify-between rounded-lg border border-separator p-3 text-sm font-semibold">
                        {b} <Check className="size-4 text-danger" aria-hidden />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                <Button onPress={() => downloadBlob(data.blob, data.filename)}>
                  <Download className="size-4" /> Descargar imagen limpia
                </Button>
                <Link
                  href="/herramientas/metadatos-extractor"
                  className="inline-flex items-center rounded-lg border border-separator px-4 py-2 text-sm hover:bg-default"
                >
                  Verificar con el Extractor EXIF
                </Link>
                <Button variant="ghost" onPress={clear}>Limpiar otra imagen</Button>
              </div>
            </Card.Content>
          </Card>
        </>
      )}
    </ToolPage>
  );
}
