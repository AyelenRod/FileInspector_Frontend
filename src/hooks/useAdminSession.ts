"use client";

import { useMemo, useSyncExternalStore } from "react";
import { clearSession, getRawSession, parseSession, subscribeSession } from "@/lib/admin-session";

export function useAdminSession() {
  const raw = useSyncExternalStore(subscribeSession, getRawSession, () => undefined);
  const session = useMemo(() => (raw ? parseSession(raw) : null), [raw]);

  return { session, isReady: raw !== undefined, logout: clearSession };
}
