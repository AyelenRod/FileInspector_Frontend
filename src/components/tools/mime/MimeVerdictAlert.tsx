import { Alert } from "@heroui/react";
import { stripLeadingDot } from "@/lib/format";
import type { MimeResult } from "@/types";

export function MimeVerdictAlert({ data }: { data: MimeResult }) {
  const ok = data.matches;

  return (
    <Alert status={ok ? "success" : "danger"}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>
          {ok
            ? `La extensión coincide con el tipo real (${data.detected_mime}).`
            : `Archivo sospechoso. Dice ser .${stripLeadingDot(data.declared_extension)} pero es ${data.detected_mime}.`}
        </Alert.Title>
        <Alert.Description>
          {ok
            ? "La firma binaria corresponde con la extensión declarada."
            : "Se detectó una discrepancia entre la extensión declarada y la cabecera real del archivo."}
        </Alert.Description>
      </Alert.Content>
    </Alert>
  );
}
