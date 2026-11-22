export interface LabeledValue {
  label: string;
  value: number;
}

export interface AdminStats {
  requestsByModule: LabeledValue[];
  successRate: { overall: number | null; byModule: LabeledValue[] };
  commonErrors: LabeledValue[];
  averageSizeByModule: LabeledValue[];
}

export interface AdminSession {
  token: string;
}
