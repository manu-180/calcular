import type { Metadata } from "next";
import { PaginaOpiniones } from "@/components/cuenta/paginas/Cuenta";
import type { SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: `${textosDe("intl").opiniones.meta} | CalcularYa`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function OpinionesPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaOpiniones sitio="intl" searchParams={searchParams} />;
}
