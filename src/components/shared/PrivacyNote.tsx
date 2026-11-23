import { Lock } from "lucide-react";
import type { ReactNode } from "react";

export function PrivacyNote({
  children = "Tus archivos se procesan en memoria y no se guardan.",
}: {
  children?: ReactNode;
}) {
  return (
    <p className="flex items-center gap-2 text-xs text-muted">
      <Lock className="size-3.5 text-danger" aria-hidden /> {children}
    </p>
  );
}
