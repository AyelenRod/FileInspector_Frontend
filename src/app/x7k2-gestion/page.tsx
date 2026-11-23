"use client";

import { useState } from "react";
import { Skeleton } from "@heroui/react";
import { AdminHeader } from "@/components/admin/dashboard/AdminHeader";
import { CreateAdminModal } from "@/components/admin/dashboard/CreateAdminModal";
import { DashboardView } from "@/components/admin/dashboard/DashboardView";
import { LoginScreen } from "@/components/admin/login/LoginScreen";
import { CategoryBadge } from "@/components/shared/CategoryBadge";
import { ErrorAlert } from "@/components/shared/ErrorAlert";
import { useAdminSession } from "@/hooks/useAdminSession";
import { useAdminStats } from "@/hooks/useAdminStats";

export default function GestionPage() {
  const { session, isReady, logout } = useAdminSession();
  const stats = useAdminStats(session, logout);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (!isReady) return null;
  if (!session) return <LoginScreen />;

  return (
    <>
      <AdminHeader
        isLoading={stats.isLoading}
        onCreateAdmin={() => setIsCreateOpen(true)}
        onReload={stats.reload}
        onLogout={logout}
      />
      <CreateAdminModal
        isOpen={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        token={session.token}
        onUnauthorized={logout}
      />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <CategoryBadge category="Administración" />
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Métricas de uso</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Solicitudes, tasa de éxito, errores frecuentes y tamaño promedio de los archivos procesados por la API.
        </p>
        <div className="mt-8 flex flex-col gap-6">
          <ErrorAlert message={stats.error} />
          {stats.data ? (
            <DashboardView data={stats.data} />
          ) : (
            !stats.error && <Skeleton className="h-96 w-full rounded-2xl" />
          )}
        </div>
      </div>
    </>
  );
}
