import { isValidCoordinate } from "@/lib/security/sanitize";

interface GpsLinkProps {
  latitude: number;
  longitude: number;
}

export function GpsLink({ latitude, longitude }: GpsLinkProps) {
  if (!isValidCoordinate(latitude, longitude)) return <span>Coordenadas no válidas</span>;

  return (
    <a
      className="text-accent underline"
      target="_blank"
      rel="noopener noreferrer"
      href={`https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`}
    >
      {latitude.toFixed(6)}, {longitude.toFixed(6)}
    </a>
  );
}
