import type { BinaryDiffResult } from "@/types";
import { DiffActions } from "./DiffActions";
import { SizeMismatchNotice, TruncatedDiffNotice } from "./DiffNotices";
import { DiffOffsetsCard } from "./DiffOffsetsCard";
import { DiffSummaryCard } from "./DiffSummaryCard";

export function BinaryDiffViewer({ data, onReset }: { data: BinaryDiffResult; onReset: () => void }) {
  const shown = data.differences.length;

  return (
    <div className="flex flex-col gap-5">
      <DiffSummaryCard data={data} />
      {data.size_a !== data.size_b && <SizeMismatchNotice />}
      {data.total_differences > shown && <TruncatedDiffNotice shown={shown} />}
      {shown > 0 && <DiffOffsetsCard differences={data.differences} />}
      <DiffActions differences={data.differences} onReset={onReset} />
    </div>
  );
}
