import { Card } from "@heroui/react";
import { Calendar, Camera, Code2, MapPin } from "lucide-react";
import { formatBytes, formatCamera } from "@/lib/format";
import type { MetadataResult } from "@/types";
import { ExtraFieldsTable } from "./ExtraFieldsTable";
import { GpsLink } from "./GpsLink";
import { MetadataRow } from "./MetadataRow";

export function MetadataViewer({ data }: { data: MetadataResult }) {
  const extraFields = Object.entries(data.extra ?? {});

  return (
    <Card>
      <Card.Header>
        <Card.Title className="break-all">{data.filename}</Card.Title>
        <Card.Description>{formatBytes(data.size)}</Card.Description>
      </Card.Header>
      <Card.Content>
        <MetadataRow icon={<Camera className="size-5" />} label="Cámara" value={formatCamera(data.camera)} />
        <MetadataRow icon={<Calendar className="size-5" />} label="Fecha de captura" value={data.date_taken} />
        <MetadataRow
          icon={<MapPin className="size-5" />}
          label="Coordenadas GPS"
          value={data.gps ? <GpsLink latitude={data.gps.latitude} longitude={data.gps.longitude} /> : null}
        />
        <MetadataRow icon={<Code2 className="size-5" />} label="Software" value={data.software} />
        {extraFields.length > 0 && <ExtraFieldsTable fields={extraFields} />}
      </Card.Content>
    </Card>
  );
}
