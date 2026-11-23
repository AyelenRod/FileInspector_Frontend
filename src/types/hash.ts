export type HashAlgorithm = "md5" | "sha1" | "sha256" | "sha512";

export interface HashResult {
  source: string;
  size: number;
  hashes: Partial<Record<HashAlgorithm, string>>;
}
