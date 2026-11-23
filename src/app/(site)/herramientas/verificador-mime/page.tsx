"use client";

import { ToolPage } from "@/components/shared/ToolPage";
import { MimeResultCard } from "@/components/tools/mime/MimeResultCard";
import { MimeUploadCard } from "@/components/tools/mime/MimeUploadCard";
import { RecognizedTypesCard } from "@/components/tools/mime/RecognizedTypesCard";
import { useFileTool } from "@/hooks/useFileTool";
import { verifyMime } from "@/services/mime.service";
import { getTool } from "@/lib/tools";
import type { MimeResult } from "@/types";

export default function VerificadorMimePage() {
  const { file, selectFile, clearFile, data, error, isLoading, progress, run } = useFileTool<MimeResult>();

  return (
    <ToolPage tool={getTool("verificador-mime")}>
      {data ? (
        <MimeResultCard data={data} onReset={clearFile} />
      ) : (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <MimeUploadCard
            canSubmit={!!file}
            isLoading={isLoading}
            progress={progress}
            error={error}
            onFilesSelected={selectFile}
            onClear={clearFile}
            onSubmit={() => file && run((p) => verifyMime(file, p))}
          />
          <RecognizedTypesCard />
        </div>
      )}
    </ToolPage>
  );
}
