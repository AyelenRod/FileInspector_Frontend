import type { MimeResult } from "@/types";
import { FormatComparison } from "./FormatComparison";
import { MagicBytesCard } from "./MagicBytesCard";
import { MimeFileHeader } from "./MimeFileHeader";
import { MimeResultFooter } from "./MimeResultFooter";
import { MimeVerdictAlert } from "./MimeVerdictAlert";
import { SecurityWarningCard } from "./SecurityWarningCard";

export function MimeResultCard({ data, onReset }: { data: MimeResult; onReset: () => void }) {
  return (
    <div className="flex flex-col gap-5">
      <MimeFileHeader data={data} onReset={onReset} />
      <MimeVerdictAlert data={data} />
      <FormatComparison data={data} />
      <MagicBytesCard data={data} />
      {!data.matches && <SecurityWarningCard onReset={onReset} />}
      <MimeResultFooter data={data} />
    </div>
  );
}
