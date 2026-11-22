import { api } from "./http";

type TokenSource = Record<string, unknown> | null | undefined;

const TOKEN_KEYS = ["token", "access_token", "accessToken", "jwt"];

function findToken(source: TokenSource): string | null {
  if (!source) return null;
  for (const key of TOKEN_KEYS) {
    const value = source[key];
    if (typeof value === "string" && value) return value;
  }
  return null;
}

export async function login(username: string, password: string): Promise<string> {
  const { data } = await api.post<{ data?: TokenSource } & Record<string, unknown>>("/auth/login", {
    username,
    password,
  });
  const token = findToken(data.data) ?? findToken(data);
  if (!token) throw new Error("El servidor no devolvió un token de acceso.");
  return token;
}
