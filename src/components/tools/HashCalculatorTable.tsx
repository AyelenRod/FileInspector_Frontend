"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { Check, CheckCircle2, Copy, XCircle } from "lucide-react";
import type { HashAlgorithm, HashResult } from "@/types";

export const ALGORITHMS: { key: HashAlgorithm; label: string; badge: string; badgeClass: string }[] = [
  { key: "md5", label: "MD5", badge: "No usar para seguridad", badgeClass: "bg-default text-muted" },
  { key: "sha1", label: "SHA-1", badge: "No usar para seguridad", badgeClass: "bg-default text-muted" },
  { key: "sha256", label: "SHA-256", badge: "Recomendado", badgeClass: "bg-accent/30 text-danger" },
  { key: "sha512", label: "SHA-512", badge: "Robusto / Alta seguridad", badgeClass: "bg-default text-muted" },
];

export function HashCalculatorTable({ data }: { data: HashResult }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [known, setKnown] = useState("");
  const [compared, setCompared] = useState<string | null>(null);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 2000);
    } catch {
      setCopied(null);
    }
  };

  const rows = ALGORITHMS.filter((a) => data.hashes[a.key]);
  const matchedAlgo = compared
    ? rows.find((a) => data.hashes[a.key]!.toLowerCase() === compared.trim().toLowerCase())
    : undefined;

  return (
    <div className="flex flex-col gap-4">
      {rows.map(({ key, label, badge, badgeClass }) => (
        <Card key={key}>
          <Card.Content className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                {label} <span className={`rounded-md px-2 py-0.5 text-[10px] font-normal ${badgeClass}`}>{badge}</span>
              </span>
              <Button size="sm" variant="secondary" onPress={() => copy(key, data.hashes[key]!)}>
                {copied === key ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
                {copied === key ? "Copiado" : "Copiar"}
              </Button>
            </div>
            <code className="break-all rounded-lg bg-background p-3 font-mono text-xs">{data.hashes[key]}</code>
          </Card.Content>
        </Card>
      ))}

      <Card>
        <Card.Header>
          <Card.Title className="text-base">Comparar con un hash conocido</Card.Title>
          <Card.Description>
            Introduce el valor hash provisto por el autor o proveedor para contrastarlo con los resultados generados.
          </Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col gap-4">
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setCompared(known);
            }}
          >
            <input
              value={known}
              onChange={(e) => {
                setKnown(e.target.value);
                setCompared(null);
              }}
              placeholder="Pega aquí el hash esperado"
              aria-label="Hash conocido"
              className="min-w-0 flex-1 rounded-lg border border-separator bg-background px-3 py-2 font-mono text-xs outline-none focus:border-danger"
            />
            <Button type="submit" isDisabled={!known.trim()}>Comparar</Button>
          </form>
          {compared !== null && (
            matchedAlgo ? (
              <div className="flex items-start gap-3 rounded-xl border border-success/40 bg-success/10 p-4">
                <CheckCircle2 className="size-5 text-success" aria-hidden />
                <div>
                  <p className="font-semibold">Coincide con {matchedAlgo.label}</p>
                  <p className="text-xs text-muted">Integridad confirmada: el hash ingresado es exactamente igual al resultado calculado.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4">
                <XCircle className="size-5 text-danger" aria-hidden />
                <div>
                  <p className="font-semibold">No coincide con ningún hash</p>
                  <p className="text-xs text-muted">Discrepancia detectada: el archivo podría estar corrupto o haber sido alterado.</p>
                </div>
              </div>
            )
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
