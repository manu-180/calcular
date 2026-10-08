import type { Metadata } from "next";
import { PaginaRegistro, type SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: `${textosDe("intl").registro.meta} | CalcularYa`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RegistroPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaRegistro sitio="intl" sp={await searchParams} />;
}
