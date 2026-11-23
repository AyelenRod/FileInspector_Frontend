import type { ReactNode } from "react";
import type { ToolInfo } from "@/lib/tools";
import { CategoryBadge } from "./CategoryBadge";
import { ToolBreadcrumb } from "./ToolBreadcrumb";

interface ToolPageProps {
  tool: ToolInfo;
  children: ReactNode;
  wide?: boolean;
}

export function ToolPage({ tool, children, wide = false }: ToolPageProps) {
  return (
    <div className={`mx-auto px-4 py-8 ${wide ? "max-w-6xl" : "max-w-5xl"}`}>
      <ToolBreadcrumb title={tool.title} />
      <CategoryBadge category={tool.category} />
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{tool.headline}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{tool.subtitle}</p>
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </div>
  );
}
