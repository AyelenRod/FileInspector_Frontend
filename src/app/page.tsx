import { Lock } from "lucide-react";
import { CategoryBadge } from "@/components/shared/ToolPage";
import { ToolGrid } from "@/components/shared/ToolGrid";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-10">
        <CategoryBadge category="Herramientas de seguridad para archivos" />
        <h1 className="mt-4 max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
          Inspecciona y protege tus archivos
        </h1>
        <p className="mt-4 max-w-lg text-sm text-muted">
          Suite avanzada para análisis forense digital, extracción de metadatos sensibles y validación
          criptográfica directamente en tu navegador.
        </p>
        <p className="mt-4 flex items-center gap-2 text-xs text-muted">
          <Lock className="size-3.5 text-danger" aria-hidden /> Tus archivos se procesan en memoria y no se guardan.
        </p>
      </section>
      <ToolGrid />
    </div>
  );
}
