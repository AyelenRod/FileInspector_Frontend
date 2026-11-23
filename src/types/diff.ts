export interface DiffRow {
  offset: number;
  a: string | null;
  b: string | null;
}

export interface BinaryDiffResult {
  identical: boolean;
  size_a: number;
  size_b: number;
  matching_bytes: number;
  total_differences: number;
  differences: DiffRow[];
}
