import { formatHexOffset } from "@/lib/format";
import type { DiffRow } from "@/types";

export function buildDiffCsv(differences: DiffRow[]): string {
  const lines = ["offset_hex,offset_dec,byte_a,byte_b"];
  differences.forEach((row) =>
    lines.push(`${formatHexOffset(row.offset)},${row.offset},${row.a ?? ""},${row.b ?? ""}`),
  );
  return lines.join("\n");
}
