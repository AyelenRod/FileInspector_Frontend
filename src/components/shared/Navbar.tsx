import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { API_URL } from "@/services/http";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-separator bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-heading font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent/20 text-danger">
            <ShieldCheck className="size-4" aria-hidden />
          </span>
          FileInspector
        </Link>
        <a
          href={`${API_URL.replace(/\/api$/, "")}/docs`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted hover:text-foreground"
        >
          Documentación de la API <ExternalLink className="size-3" aria-hidden />
        </a>
      </nav>
    </header>
  );
}
