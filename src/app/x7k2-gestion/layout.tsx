import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gestión",
  robots: { index: false, follow: false },
};

export default function GestionLayout({ children }: LayoutProps<"/x7k2-gestion">) {
  return <main className="flex-1">{children}</main>;
}
