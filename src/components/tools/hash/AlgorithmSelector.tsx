import { ALGORITHMS } from "@/lib/hash-algorithms";
import type { HashAlgorithm } from "@/types";

interface AlgorithmSelectorProps {
  selected: HashAlgorithm[];
  onToggle: (algorithm: HashAlgorithm) => void;
}

export function AlgorithmSelector({ selected, onToggle }: AlgorithmSelectorProps) {
  return (
    <fieldset>
      <legend className="mb-2 flex w-full justify-between text-sm font-semibold">
        Algoritmos <span className="text-xs font-normal text-muted">{selected.length} seleccionados</span>
      </legend>
      <div className="grid grid-cols-2 gap-2">
        {ALGORITHMS.map((algorithm) => (
          <label key={algorithm.key} className="flex cursor-pointer items-center gap-2 rounded-lg border border-separator p-3 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(algorithm.key)}
              onChange={() => onToggle(algorithm.key)}
              className="accent-[#E04B72]"
            />
            {algorithm.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
