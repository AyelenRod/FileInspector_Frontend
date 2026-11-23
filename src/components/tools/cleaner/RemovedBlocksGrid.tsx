import { Check } from "lucide-react";

export function RemovedBlocksGrid({ blocks }: { blocks: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs text-muted">Bloques de metadatos eliminados con éxito</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {blocks.map((block) => (
          <div key={block} className="flex items-center justify-between rounded-lg border border-separator p-3 text-sm font-semibold">
            {block} <Check className="size-4 text-danger" aria-hidden />
          </div>
        ))}
      </div>
    </div>
  );
}
