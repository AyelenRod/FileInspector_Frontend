import { Card } from "@heroui/react";
import { downloadBlob } from "@/lib/download";
import type { CleanMetadataResult } from "@/types";
import { CleanerResultActions } from "./CleanerResultActions";
import { RemovedBlocksGrid } from "./RemovedBlocksGrid";
import { SizeSummary } from "./SizeSummary";

interface SanitizationResultCardProps {
  data: CleanMetadataResult;
  bytesSaved: number;
  percentSaved: number;
  onClean: () => void;
}

export function SanitizationResultCard({ data, bytesSaved, percentSaved, onClean }: SanitizationResultCardProps) {
  return (
    <Card>
      <Card.Content className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">Resultado del saneamiento</h2>
          <SizeSummary
            originalSize={data.originalSize}
            cleanSize={data.cleanSize}
            bytesSaved={bytesSaved}
            percentSaved={percentSaved}
          />
        </div>
        {data.removedBlocks.length > 0 && <RemovedBlocksGrid blocks={data.removedBlocks} />}
        <CleanerResultActions onDownload={() => downloadBlob(data.blob, data.filename)} onClean={onClean} />
      </Card.Content>
    </Card>
  );
}
