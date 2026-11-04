import type { HashAlgorithm } from "@/types";

export interface HashAlgorithmInfo {
  key: HashAlgorithm;
  label: string;
  badge: string;
  badgeClass: string;
}

export const ALGORITHMS: HashAlgorithmInfo[] = [
  { key: "md5", label: "MD5", badge: "No usar para seguridad", badgeClass: "bg-default text-muted" },
  { key: "sha1", label: "SHA-1", badge: "No usar para seguridad", badgeClass: "bg-default text-muted" },
  { key: "sha256", label: "SHA-256", badge: "Recomendado", badgeClass: "bg-accent/30 text-danger" },
  { key: "sha512", label: "SHA-512", badge: "Robusto / Alta seguridad", badgeClass: "bg-default text-muted" },
];

export const DEFAULT_ALGORITHMS: HashAlgorithm[] = ["md5", "sha1", "sha256", "sha512"];
