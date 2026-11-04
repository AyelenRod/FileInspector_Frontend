"use client";

import { useState } from "react";
import { Button, Card, Skeleton, Spinner } from "@heroui/react";
import { FileText, Fingerprint, Type } from "lucide-react";
import { PrivacyNote, ToolPage } from "@/components/shared/ToolPage";
import { FileDropzone } from "@/components/shared/FileDropzone";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { ALGORITHMS, HashCalculatorTable } from "@/components/tools/HashCalculatorTable";
import { useToolRequest } from "@/hooks/useToolRequest";
import { calculateHash } from "@/services/tools.service";
import { TOOLS, formatBytes } from "@/lib/tools";
import type { HashAlgorithm, HashResult } from "@/types";

export default function CalculadoraHashPage() {
  const [mode, setMode] = useState<"file" | "text">("file");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<HashAlgorithm[]>(["md5", "sha1", "sha256", "sha512"]);
  const { data, error, isLoading, progress, run, reset } = useToolRequest<HashResult>();

  const canSubmit = (mode === "file" ? !!file : text.length > 0) && selected.length > 0;

  const toggle = (a: HashAlgorithm) =>
    setSelected((s) => (s.includes(a) ? s.filter((x) => x !== a) : [...s, a]));

  const submit = () => {
    if (mode === "file" && file) run((p) => calculateHash({ file }, selected, p));
    else if (mode === "text") run((p) => calculateHash({ text }, selected, p));
  };

  const newCalc = () => {
    setFile(null);
    setText("");
    reset();
  };

  return (
    <ToolPage tool={TOOLS[3]}>
      {data ? (
        <>
          <Card>
            <Card.Content className="flex flex-wrap items-center gap-3">
              <FileText className="size-6 text-muted" aria-hidden />
              <div className="min-w-0 flex-1">
                <p className="break-all font-semibold">{data.source}</p>
                <p className="text-xs text-muted">Tamaño: {formatBytes(data.size)} · Procesado en memoria local</p>
              </div>
              <Button variant="secondary" onPress={newCalc}>Calcular nuevo hash</Button>
            </Card.Content>
          </Card>
          <HashCalculatorTable data={data} />
          <PrivacyNote>El cálculo se realiza en memoria y el archivo no se almacena.</PrivacyNote>
        </>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <Card.Content className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-separator p-1" role="group" aria-label="Origen de los datos">
                {(["file", "text"] as const).map((m) => (
                  <Button
                    key={m}
                    aria-pressed={mode === m}
                    variant={mode === m ? "secondary" : "ghost"}
                    onPress={() => {
                      setMode(m);
                      reset();
                    }}
                  >
                    {m === "file" ? <FileText className="size-4" /> : <Type className="size-4" />}
                    {m === "file" ? "Archivo" : "Texto"}
                  </Button>
                ))}
              </div>

              {mode === "file" ? (
                <FileDropzone
                  maxSizeMB={50}
                  label="Arrastra un archivo aquí o haz clic para seleccionar"
                  hint="Cualquier formato · Máximo 50 MB"
                  isUploading={isLoading}
                  progress={progress}
                  onFilesSelected={(f) => {
                    setFile(f[0]);
                    reset();
                  }}
                  onClear={() => {
                    setFile(null);
                    reset();
                  }}
                />
              ) : (
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={7}
                  placeholder="Escribe o pega el texto a procesar…"
                  aria-label="Texto a procesar"
                  className="w-full rounded-2xl border border-separator bg-background p-4 font-mono text-sm outline-none focus:border-danger"
                />
              )}

              <fieldset>
                <legend className="mb-2 flex w-full justify-between text-sm font-semibold">
                  Algoritmos <span className="text-xs font-normal text-muted">{selected.length} seleccionados</span>
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {ALGORITHMS.map((a) => (
                    <label key={a.key} className="flex cursor-pointer items-center gap-2 rounded-lg border border-separator p-3 text-sm">
                      <input
                        type="checkbox"
                        checked={selected.includes(a.key)}
                        onChange={() => toggle(a.key)}
                        className="accent-[#E04B72]"
                      />
                      {a.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Button isDisabled={!canSubmit || isLoading} onPress={submit}>
                {isLoading ? <Spinner size="sm" /> : <Fingerprint className="size-4" aria-hidden />}
                Calcular hash
              </Button>
              <ErrorAlert message={error} />
            </Card.Content>
          </Card>

          <Card>
            <Card.Content className="flex h-full flex-col gap-4">
              <p className="font-semibold">Resultados</p>
              {isLoading ? (
                <div className="flex flex-col gap-3">
                  {selected.map((s) => <Skeleton key={s} className="h-14 w-full rounded-xl" />)}
                </div>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
                  <Fingerprint className="size-10 text-muted" aria-hidden />
                  <p className="font-semibold">Aún no hay resultados</p>
                  <p className="max-w-xs text-xs text-muted">
                    Selecciona un archivo o escribe texto y haz clic en «Calcular hash» para generar las sumas criptográficas.
                  </p>
                </div>
              )}
              <PrivacyNote>El cálculo se realiza en memoria y el archivo no se almacena.</PrivacyNote>
            </Card.Content>
          </Card>
        </div>
      )}
    </ToolPage>
  );
}
