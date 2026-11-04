"use client";

import { useState } from "react";
import { Button, Card } from "@heroui/react";
import { ALGORITHMS } from "@/lib/hash-algorithms";
import type { HashResult } from "@/types";
import { HashMatchBanner } from "./HashMatchBanner";

export function KnownHashComparer({ hashes }: { hashes: HashResult["hashes"] }) {
  const [known, setKnown] = useState("");
  const [compared, setCompared] = useState<string | null>(null);

  const matchedAlgorithm =
    compared !== null
      ? ALGORITHMS.find((a) => hashes[a.key]?.toLowerCase() === compared.trim().toLowerCase())
      : undefined;

  return (
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
        {compared !== null && <HashMatchBanner matchedLabel={matchedAlgorithm?.label} />}
      </Card.Content>
    </Card>
  );
}
