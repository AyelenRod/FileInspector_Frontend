const DEFAULT_API_URL = "http://localhost:8000/api";
const LOCAL_HOSTS = ["localhost", "127.0.0.1", "[::1]"];

export function resolveApiUrl(raw: string | undefined = process.env.NEXT_PUBLIC_API_URL): string {
  const url = new URL(raw || DEFAULT_API_URL);
  const isSecure = url.protocol === "https:";
  const isLocalHttp = url.protocol === "http:" && LOCAL_HOSTS.includes(url.hostname);
  if (!isSecure && !isLocalHttp) throw new Error("NEXT_PUBLIC_API_URL debe usar HTTPS fuera de localhost.");
  return url.href.replace(/\/+$/, "");
}
