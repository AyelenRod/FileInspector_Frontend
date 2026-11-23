"use client";

import { useCallback, useEffect, useState } from "react";
import { getErrorMessage, isUnauthorized } from "@/services/http";
import { fetchStats } from "@/services/stats.service";
import type { AdminSession, AdminStats } from "@/types";

export function useAdminStats(session: AdminSession | null, onUnauthorized: () => void) {
  const [data, setData] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    if (!session) return;
    let active = true;
    const load = async () => {
      try {
        const result = await fetchStats(session.token);
        if (active) setData(result);
      } catch (e) {
        if (!active) return;
        if (isUnauthorized(e)) onUnauthorized();
        else setError(getErrorMessage(e));
      } finally {
        if (active) setIsLoading(false);
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [session, version, onUnauthorized]);

  const reload = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setVersion((current) => current + 1);
  }, []);

  return { data, error, isLoading, reload };
}
