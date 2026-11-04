import { Button } from "@heroui/react";
import { FileText, Type } from "lucide-react";
import type { HashInputMode } from "@/types";

const MODES: HashInputMode[] = ["file", "text"];

interface HashSourceToggleProps {
  mode: HashInputMode;
  onChange: (mode: HashInputMode) => void;
}

export function HashSourceToggle({ mode, onChange }: HashSourceToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-xl border border-separator p-1" role="group" aria-label="Origen de los datos">
      {MODES.map((m) => (
        <Button key={m} aria-pressed={mode === m} variant={mode === m ? "secondary" : "ghost"} onPress={() => onChange(m)}>
          {m === "file" ? <FileText className="size-4" /> : <Type className="size-4" />}
          {m === "file" ? "Archivo" : "Texto"}
        </Button>
      ))}
    </div>
  );
}
