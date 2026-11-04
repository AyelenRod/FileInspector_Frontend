"use client";

import { Button, Card } from "@heroui/react";
import { Check, Copy } from "lucide-react";
import type { HashAlgorithmInfo } from "@/lib/hash-algorithms";

interface HashValueCardProps {
  algorithm: HashAlgorithmInfo;
  value: string;
  isCopied: boolean;
  onCopy: () => void;
}

export function HashValueCard({ algorithm, value, isCopied, onCopy }: HashValueCardProps) {
  return (
    <Card>
      <Card.Content className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold">
            {algorithm.label}
            <span className={`rounded-md px-2 py-0.5 text-[10px] font-normal ${algorithm.badgeClass}`}>{algorithm.badge}</span>
          </span>
          <Button size="sm" variant="secondary" onPress={onCopy}>
            {isCopied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
            {isCopied ? "Copiado" : "Copiar"}
          </Button>
        </div>
        <code className="break-all rounded-lg bg-background p-3 font-mono text-xs">{value}</code>
      </Card.Content>
    </Card>
  );
}
