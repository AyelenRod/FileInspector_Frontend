import { Button } from "@heroui/react";
import { LogOut, RefreshCw, ShieldCheck, UserPlus } from "lucide-react";

interface AdminHeaderProps {
  isLoading: boolean;
  onCreateAdmin: () => void;
  onReload: () => void;
  onLogout: () => void;
}

export function AdminHeader({ isLoading, onCreateAdmin, onReload, onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-separator bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2 font-heading font-bold">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent/20 text-danger">
            <ShieldCheck className="size-4" aria-hidden />
          </span>
          FileInspector
          <span className="rounded-full bg-accent/30 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-danger">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onPress={onCreateAdmin}>
            <UserPlus className="size-3.5" aria-hidden /> Nuevo administrador
          </Button>
          <Button size="sm" variant="secondary" onPress={onReload} isDisabled={isLoading}>
            <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} aria-hidden /> Actualizar
          </Button>
          <Button size="sm" variant="secondary" onPress={onLogout}>
            <LogOut className="size-3.5" aria-hidden /> Salir
          </Button>
        </div>
      </nav>
    </header>
  );
}
