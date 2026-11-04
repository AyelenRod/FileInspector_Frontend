export interface MimeResult {
  filename: string;
  size: number;
  declared_extension: string;
  declared_mime: string | null;
  detected_mime: string;
  detected_extension: string | null;
  magic_bytes: string;
  magic_ascii: string | null;
  signature_description: string | null;
  sha256: string | null;
  confidence: number;
  matches: boolean;
  analysis_ms: number | null;
}
