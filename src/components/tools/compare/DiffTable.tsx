import { formatHexOffset, hexToAscii } from "@/lib/format";
import type { DiffRow } from "@/types";

const HEADERS = ["Offset (hexadecimal)", "Offset (decimal)", "Byte A", "Byte B", "ASCII A", "ASCII B"];

function ByteBadge({ hex }: { hex: string | null }) {
  return <span className="rounded bg-accent/40 px-2 py-0.5 text-danger">{hex?.toUpperCase() ?? "--"}</span>;
}

export function DiffTable({ rows }: { rows: DiffRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] text-sm">
        <thead className="text-left text-xs text-muted">
          <tr>
            {HEADERS.map((header) => (
              <th key={header} className="px-2 py-2 font-medium">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="font-mono">
          {rows.map((row) => (
            <tr key={row.offset} className="border-t border-separator">
              <td className="px-2 py-2">{formatHexOffset(row.offset)}</td>
              <td className="px-2 py-2">{row.offset}</td>
              <td className="px-2 py-2"><ByteBadge hex={row.a} /></td>
              <td className="px-2 py-2"><ByteBadge hex={row.b} /></td>
              <td className="px-2 py-2">{hexToAscii(row.a)}</td>
              <td className="px-2 py-2">{hexToAscii(row.b)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
