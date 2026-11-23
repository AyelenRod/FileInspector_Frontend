"use client";

import { useCallback, useRef, useState, type FormEvent } from "react";
import { validateNewAdmin } from "@/lib/admin-validation";
import { createAdmin } from "@/services/auth.service";
import { getErrorMessage, isConflict, isUnauthorized } from "@/services/http";

export function useCreateAdmin(token: string, onUnauthorized: () => void) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inFlight = useRef(false);

  const reset = useCallback(() => {
    setUsername("");
    setPassword("");
    setError(null);
    setCreated(null);
  }, []);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (inFlight.current) return;
    const user = username.trim();
    const invalid = validateNewAdmin(user, password);
    if (invalid) {
      setError(invalid);
      setCreated(null);
      return;
    }
    inFlight.current = true;
    setIsLoading(true);
    setError(null);
    setCreated(null);
    try {
      setCreated(await createAdmin(token, user, password));
      setUsername("");
      setPassword("");
    } catch (e) {
      if (isUnauthorized(e)) onUnauthorized();
      else setError(isConflict(e) ? "Ese nombre de usuario ya existe." : getErrorMessage(e));
    } finally {
      inFlight.current = false;
      setIsLoading(false);
    }
  };

  return { username, setUsername, password, setPassword, submit, reset, isLoading, error, created };
}
