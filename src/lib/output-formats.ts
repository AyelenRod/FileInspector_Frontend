import type { CleanOutputFormat } from "@/types";

export const OUTPUT_FORMATS: { value: CleanOutputFormat; title: string; desc: string }[] = [
  { value: "jpeg", title: "JPEG", desc: "Ideal para web y fotos" },
  { value: "png", title: "PNG", desc: "Preserva gráficos y transparencias" },
];
