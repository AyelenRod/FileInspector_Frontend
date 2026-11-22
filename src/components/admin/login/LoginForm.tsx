"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { Eye, EyeOff, Lock, ShieldCheck, User } from "lucide-react";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { MAX_CREDENTIAL_LENGTH } from "@/lib/limits";

const FIELD_CLASS =
  "flex items-center gap-3 rounded-xl border border-separator bg-surface px-3 py-3 focus-within:border-danger";
const INPUT_CLASS = "min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted";

export function LoginForm() {
  const login = useAdminLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-3">
        <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
          <ShieldCheck className="size-6" aria-hidden />
        </span>
        <div>
          <p className="font-heading font-bold">FileInspector</p>
          <p className="text-xs text-muted">Panel de administración</p>
        </div>
      </div>

      <h1 className="mt-12 text-3xl font-bold">Bienvenido de nuevo</h1>
      <p className="mt-3 text-sm text-muted">
        Accede al panel administrativo para consultar las métricas de uso de la API.
      </p>

      <form onSubmit={login.submit} className="mt-8 flex flex-col gap-5">
        <div>
          <label htmlFor="admin-username" className="mb-2 block text-sm">Usuario</label>
          <div className={FIELD_CLASS}>
            <User className="size-4 text-muted" aria-hidden />
            <input
              id="admin-username"
              type="text"
              autoComplete="username"
              value={login.username}
              onChange={(e) => login.setUsername(e.target.value)}
              maxLength={MAX_CREDENTIAL_LENGTH}
              placeholder="nombre de usuario"
              className={INPUT_CLASS}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="admin-password" className="mb-2 block text-sm">Contraseña</label>
          <div className={FIELD_CLASS}>
            <Lock className="size-4 text-muted" aria-hidden />
            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={login.password}
              onChange={(e) => login.setPassword(e.target.value)}
              maxLength={MAX_CREDENTIAL_LENGTH}
              placeholder="••••••••••••"
              className={INPUT_CLASS}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              className="text-muted hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={login.remember}
            onChange={(e) => login.setRemember(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          Recordar mi sesión
        </label>

        <ErrorAlert message={login.error} />

        <Button type="submit" variant="primary" isDisabled={login.isLoading} className="w-full">
          {login.isLoading ? "Verificando…" : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
}
