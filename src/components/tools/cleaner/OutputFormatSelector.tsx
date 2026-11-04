import { Info } from "lucide-react";
import { OUTPUT_FORMATS } from "@/lib/output-formats";
import type { CleanOutputFormat } from "@/types";

interface OutputFormatSelectorProps {
  value: CleanOutputFormat;
  onChange: (format: CleanOutputFormat) => void;
  disabled: boolean;
}

export function OutputFormatSelector({ value, onChange, disabled }: OutputFormatSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2" disabled={disabled}>
      <legend className="mb-2 text-sm font-semibold">Formato de salida</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {OUTPUT_FORMATS.map((f) => (
          <label
            key={f.value}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
              value === f.value ? "border-danger bg-accent/10" : "border-separator"
            }`}
          >
            <input
              type="radio"
              name="output_format"
              value={f.value}
              checked={value === f.value}
              onChange={() => onChange(f.value)}
              className="accent-[#E04B72]"
            />
            <span>
              <span className="block text-sm font-semibold">{f.title}</span>
              <span className="block text-xs text-muted">{f.desc}</span>
            </span>
          </label>
        ))}
      </div>
      <p className="mt-1 flex items-center gap-2 text-xs text-muted">
        <Info className="size-3.5" aria-hidden />
        El formato es obligatorio porque la imagen se reconstruye sin metadatos.
      </p>
    </fieldset>
  );
}
