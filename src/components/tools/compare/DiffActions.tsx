"use client";

import { Button } from "@heroui/react";
import { Download } from "lucide-react";
import { buildDiffCsv } from "@/lib/diff-csv";
import { downloadBlob } from "@/lib/download";
import type { DiffRow } from "@/types";

interface DiffActionsProps {
  differences: DiffRow[];
  onReset: () => void;
}

export function DiffActions({ differences, onReset }: DiffActionsProps) {
  const exportCsv = () =>
    downloadBlob(new Blob([buildDiffCsv(differences)], { type: "text/csv" }), "diferencias.csv");

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onPress={onReset}>Comparar otros archivos</Button>
      {differences.length > 0 && (
        <Button variant="secondary" onPress={exportCsv}>
          <Download className="size-4" /> Exportar diferencias .CSV
        </Button>
      )}
    </div>
  );
}
