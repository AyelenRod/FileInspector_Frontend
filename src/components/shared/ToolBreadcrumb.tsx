import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ToolBreadcrumb({ title }: { title: string }) {
  return (
    <div className="mb-6 flex items-center justify-between text-xs text-muted">
      <p>
        <Link href="/" className="hover:text-foreground">Inicio</Link> / {title}
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-1 rounded-lg border border-separator px-3 py-1.5 hover:text-foreground"
      >
        <ArrowLeft className="size-3" aria-hidden /> Volver a herramientas
      </Link>
    </div>
  );
}
