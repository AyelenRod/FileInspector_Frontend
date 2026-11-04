import { Card, Skeleton } from "@heroui/react";
import { Calendar, Camera, Code2, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { formatBytes } from "@/lib/tools";
import type { MetadataResult } from "@/types";

function Row({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div className="flex items-start gap-3 border-b border-separator py-3 last:border-0">
      <span className="mt-0.5 text-muted">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
        <p className="break-words font-medium">{value ?? "—"}</p>
      </div>
    </div>
  );
}

export function MetadataViewerSkeleton() {
  return (
    <Card>
      <Card.Content className="flex flex-col gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-10 w-full rounded-lg" />
        ))}
      </Card.Content>
    </Card>
  );
}

export function MetadataViewer({ data }: { data: MetadataResult }) {
  const camera = data.camera
    ? [data.camera.make, data.camera.model].filter(Boolean).join(" ") || null
    : null;
  const extra = Object.entries(data.extra ?? {});

  return (
    <Card>
      <Card.Header>
        <Card.Title className="break-all">{data.filename}</Card.Title>
        <Card.Description>{formatBytes(data.size)}</Card.Description>
      </Card.Header>
      <Card.Content>
        <Row icon={<Camera className="size-5" />} label="Cámara" value={camera} />
        <Row icon={<Calendar className="size-5" />} label="Fecha de captura" value={data.date_taken} />
        <Row
          icon={<MapPin className="size-5" />}
          label="Coordenadas GPS"
          value={
            data.gps ? (
              <a
                className="text-accent underline"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.openstreetmap.org/?mlat=${data.gps.latitude}&mlon=${data.gps.longitude}#map=15/${data.gps.latitude}/${data.gps.longitude}`}
              >
                {data.gps.latitude.toFixed(6)}, {data.gps.longitude.toFixed(6)}
              </a>
            ) : null
          }
        />
        <Row icon={<Code2 className="size-5" />} label="Software" value={data.software} />

        {extra.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-accent">
              Ver {extra.length} campos adicionales
            </summary>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {extra.map(([k, v]) => (
                  <tr key={k} className="border-b border-separator last:border-0">
                    <th className="py-2 pr-4 text-left font-medium text-muted">{k}</th>
                    <td className="break-all py-2">{String(v ?? "—")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        )}
      </Card.Content>
    </Card>
  );
}
