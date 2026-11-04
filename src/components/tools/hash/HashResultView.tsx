import { PrivacyNote } from "@/components/shared/PrivacyNote";
import type { HashResult } from "@/types";
import { HashCalculatorTable } from "./HashCalculatorTable";
import { HashSummaryCard } from "./HashSummaryCard";

export function HashResultView({ data, onReset }: { data: HashResult; onReset: () => void }) {
  return (
    <>
      <HashSummaryCard data={data} onReset={onReset} />
      <HashCalculatorTable data={data} />
      <PrivacyNote>El cálculo se realiza en memoria y el archivo no se almacena.</PrivacyNote>
    </>
  );
}
