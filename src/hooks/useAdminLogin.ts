"use client";

import { useState, type FormEvent } from "react";
import { saveSession } from "@/lib/admin-session";
import { login } from "@/services/auth.service";
import { useToolRequest } from "./useToolRequest";

export function useAdminLogin() {
  const request = useToolRequest<string>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const user = username.trim();
    if (!user || !password) return;
    const token = await request.run(() => login(user, password));
    if (!token) return;
    saveSession({ token }, remember);
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    remember,
    setRemember,
    submit,
    isLoading: request.isLoading,
    error: request.error,
  };
}
