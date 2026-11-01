import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import type { ReactNode } from "react";
import type { ToolInfo } from "@/lib/tools";

export function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-block rounded-full bg-accent/30 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-danger">
      {category}
    </span>
  );
}

export function PrivacyNote({ children = "Tus archivos se procesan en memoria y no se guardan." }: { children?: ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs text-muted">
      <Lock className="size-3.5 text-danger" aria-hidden /> {children}
    </p>
  );
}

/** Contenedor común: breadcrumb, badge, titular y subtítulo (según Figma). */
export function ToolPage({
  tool,
  children,
  wide = false,
}: {
  tool: ToolInfo;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`mx-auto px-4 py-8 ${wide ? "max-w-6xl" : "max-w-5xl"}`}>
      <div className="mb-6 flex items-center justify-between text-xs text-muted">
        <p>
          <Link href="/" className="hover:text-foreground">Inicio</Link> / {tool.title}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-1 rounded-lg border border-separator px-3 py-1.5 hover:text-foreground"
        >
          <ArrowLeft className="size-3" aria-hidden /> Volver a herramientas
        </Link>
      </div>
      <CategoryBadge category={tool.category} />
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{tool.headline}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{tool.subtitle}</p>
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </div>
  );
}
