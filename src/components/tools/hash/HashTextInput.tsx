interface HashTextInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function HashTextInput({ value, onChange }: HashTextInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={7}
      placeholder="Escribe o pega el texto a procesar…"
      aria-label="Texto a procesar"
      className="w-full rounded-2xl border border-separator bg-background p-4 font-mono text-sm outline-none focus:border-danger"
    />
  );
}
