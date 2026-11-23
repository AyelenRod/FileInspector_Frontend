import type { LabeledValue } from "@/types";

const MODULE_LABELS: Record<string, string> = {
  exif: "Extractor EXIF",
  clean: "Limpiador de metadatos",
  mime: "Verificador MIME",
  hash: "Calculadora de hash",
  compare: "Comparador binario",
};

export function moduleLabel(key: string): string {
  return MODULE_LABELS[key.toLowerCase()] ?? key;
}

export function sum(items: LabeledValue[]): number {
  return items.reduce((total, item) => total + item.value, 0);
}

export function average(items: LabeledValue[]): number | null {
  return items.length ? sum(items) / items.length : null;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
