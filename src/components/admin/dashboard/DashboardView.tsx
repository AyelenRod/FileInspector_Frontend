import { AlertTriangle, CheckCircle2, Files, Inbox } from "lucide-react";
import { average, formatPercent, moduleLabel, sum } from "@/lib/admin-format";
import { formatBytes, formatNumber } from "@/lib/format";
import type { AdminStats } from "@/types";
import { BarList } from "./BarList";
import { MetricCard } from "./MetricCard";
import { StatTile } from "./StatTile";
import { SuccessDonut } from "./SuccessDonut";

export function DashboardView({ data }: { data: AdminStats }) {
  const totalRequests = sum(data.requestsByModule);
  const totalErrors = sum(data.commonErrors);
  const successRate = data.successRate.overall ?? average(data.successRate.byModule);
  const averageSize = average(data.averageSizeByModule);
  const topModule = [...data.requestsByModule].sort((a, b) => b.value - a.value)[0];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile
          icon={Inbox}
          label="Solicitudes totales"
          value={formatNumber(totalRequests)}
          hint={topModule ? `Más usado: ${moduleLabel(topModule.label)}` : undefined}
        />
        <StatTile
          icon={CheckCircle2}
          label="Tasa de éxito"
          value={successRate === null ? "—" : formatPercent(successRate)}
        />
        <StatTile icon={AlertTriangle} label="Errores registrados" value={formatNumber(totalErrors)} />
        <StatTile
          icon={Files}
          label="Tamaño promedio"
          value={averageSize === null ? "—" : formatBytes(averageSize)}
          hint="Por solicitud, entre módulos"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <MetricCard title="Solicitudes por módulo" description="Volumen de uso de cada herramienta.">
          <BarList items={data.requestsByModule} formatLabel={moduleLabel} formatValue={formatNumber} />
        </MetricCard>

        <MetricCard title="Tasa de éxito" description="Porcentaje de solicitudes resueltas sin error.">
          <div className="flex flex-wrap items-center gap-6">
            {successRate !== null && <SuccessDonut value={successRate} />}
            <div className="min-w-48 flex-1">
              <BarList items={data.successRate.byModule} formatLabel={moduleLabel} formatValue={formatPercent} max={100} />
            </div>
          </div>
        </MetricCard>

        <MetricCard title="Errores más comunes" description="Códigos de error devueltos con mayor frecuencia.">
          <BarList items={data.commonErrors} formatValue={formatNumber} />
        </MetricCard>

        <MetricCard title="Tamaño promedio por módulo" description="Peso medio de los archivos procesados.">
          <BarList items={data.averageSizeByModule} formatLabel={moduleLabel} formatValue={formatBytes} />
        </MetricCard>
      </div>
    </>
  );
}
