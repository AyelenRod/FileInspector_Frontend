import Link from "next/link";
import { Button } from "@heroui/react";
import { Download } from "lucide-react";

interface CleanerResultActionsProps {
  onDownload: () => void;
  onClean: () => void;
}

export function CleanerResultActions({ onDownload, onClean }: CleanerResultActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button onPress={onDownload}>
        <Download className="size-4" /> Descargar imagen limpia
      </Button>
      <Link
        href="/herramientas/metadatos-extractor"
        className="inline-flex items-center rounded-lg border border-separator px-4 py-2 text-sm hover:bg-default"
      >
        Verificar con el Extractor EXIF
      </Link>
      <Button variant="ghost" onPress={onClean}>Limpiar otra imagen</Button>
    </div>
  );
}
