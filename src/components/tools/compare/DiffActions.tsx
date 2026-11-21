"use client";

import { Button } from "@heroui/react";

export function DiffActions({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onPress={onReset}>Comparar otros archivos</Button>
    </div>
  );
}
