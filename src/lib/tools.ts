import { Binary, FileSearch, Fingerprint, FileCheck2, Eraser, type LucideIcon } from "lucide-react";

export interface ToolInfo {
  slug: string;
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  headline: string;
  subtitle: string;
  category: "Privacidad" | "Integridad";
  accent: string;
}

export const TOOLS: ToolInfo[] = [
  {
    slug: "metadatos-extractor",
    href: "/herramientas/metadatos-extractor",
    title: "Extractor de Metadatos EXIF",
    description: "Extrae metadatos ocultos de tus imágenes.",
    headline: "Descubre qué esconden tus imágenes",
    subtitle: "Consulta cámara, fecha de captura, coordenadas GPS y software incrustados en una imagen.",
    category: "Privacidad",
    icon: FileSearch,
    accent: "bg-accent/20 text-danger",
  },
  {
    slug: "metadatos-limpiador",
    href: "/herramientas/metadatos-limpiador",
    title: "Limpiador de Metadatos",
    description: "Elimina rastros antes de compartir.",
    headline: "Elimina rastros antes de compartir",
    subtitle: "Remueve los metadatos EXIF, XMP e IPTC de tus imágenes y descarga una versión limpia, lista para publicar o enviar.",
    category: "Privacidad",
    icon: Eraser,
    accent: "bg-accent/20 text-danger",
  },
  {
    slug: "verificador-mime",
    href: "/herramientas/verificador-mime",
    title: "Verificador de Tipo MIME Real",
    description: "Detecta archivos disfrazados.",
    headline: "Detecta archivos disfrazados",
    subtitle: "Analiza la firma binaria (magic numbers) de un archivo para conocer su tipo real, sin fiarte de la extensión de archivo declarada.",
    category: "Integridad",
    icon: FileCheck2,
    accent: "bg-accent/20 text-danger",
  },
  {
    slug: "calculadora-hash",
    href: "/herramientas/calculadora-hash",
    title: "Calculadora de Hash",
    description: "Verifica la integridad de tus archivos.",
    headline: "Verifica la integridad de tus archivos",
    subtitle: "Calcula hashes criptográficos MD5, SHA-1, SHA-256 y SHA-512 de cualquier archivo o texto para comprobar que no ha sido alterado.",
    category: "Integridad",
    icon: Fingerprint,
    accent: "bg-accent/20 text-danger",
  },
  {
    slug: "comparador-binario",
    href: "/herramientas/comparador-binario",
    title: "Comparador Binario",
    description: "Encuentra diferencias byte a byte.",
    headline: "Encuentra diferencias byte a byte",
    subtitle: "Compara dos archivos a nivel binario y muestra las diferencias exactas con su posición (offset).",
    category: "Integridad",
    icon: Binary,
    accent: "bg-accent/20 text-danger",
  },
];


export function getTool(slug: string): ToolInfo {
  const tool = TOOLS.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Herramienta no registrada: ${slug}`);
  return tool;
}
