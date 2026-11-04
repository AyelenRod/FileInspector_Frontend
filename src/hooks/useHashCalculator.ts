"use client";

import { useState } from "react";
import { useFileTool } from "./useFileTool";
import { calculateHash } from "@/services/hash.service";
import { DEFAULT_ALGORITHMS } from "@/lib/hash-algorithms";
import type { HashAlgorithm, HashInputMode, HashResult } from "@/types";

export function useHashCalculator() {
  const [mode, setMode] = useState<HashInputMode>("file");
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<HashAlgorithm[]>(DEFAULT_ALGORITHMS);
  const { file, selectFile, clearFile, data, error, isLoading, progress, run, reset } = useFileTool<HashResult>();

  const canSubmit = (mode === "file" ? !!file : text.length > 0) && selected.length > 0;

  const changeMode = (next: HashInputMode) => {
    setMode(next);
    reset();
  };

  const toggleAlgorithm = (algorithm: HashAlgorithm) =>
    setSelected((current) =>
      current.includes(algorithm) ? current.filter((a) => a !== algorithm) : [...current, algorithm],
    );

  const submit = () => {
    if (mode === "file" && file) run((p) => calculateHash({ file }, selected, p));
    else if (mode === "text") run((p) => calculateHash({ text }, selected, p));
  };

  const startOver = () => {
    clearFile();
    setText("");
  };

  return {
    mode,
    changeMode,
    text,
    setText,
    selected,
    toggleAlgorithm,
    selectFile,
    clearFile,
    canSubmit,
    submit,
    startOver,
    data,
    error,
    isLoading,
    progress,
  };
}
