import Image from "next/image";
import { Activity, ShieldAlert, Gauge } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Activity, title: "Solicitudes por módulo", text: "Qué herramientas se usan más." },
  { icon: Gauge, title: "Tasa de éxito", text: "Salud de cada endpoint." },
  { icon: ShieldAlert, title: "Errores frecuentes", text: "Fallas más comunes del servicio." },
];

export function LoginHero() {
  return (
    <aside className="relative hidden overflow-hidden lg:block">
      <Image
        src="/images/login-hero.jpg"
        alt="Código fuente ampliado con una lupa que resalta un ciberataque"
        fill
        priority
        sizes="50vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      <div className="absolute inset-x-0 bottom-0 p-12">
        <span className="inline-block rounded-full bg-accent/30 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-danger">
          Centro de control FileInspector
        </span>
        <h2 className="mt-4 max-w-md text-4xl font-bold">
          Todo el uso de tu API, <span className="text-danger">en una sola vista.</span>
        </h2>
        <ul className="mt-8 grid grid-cols-3 gap-6">
          {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
            <li key={title}>
              <Icon className="size-5 text-danger" aria-hidden />
              <p className="mt-2 text-sm font-semibold">{title}</p>
              <p className="mt-1 text-xs text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
