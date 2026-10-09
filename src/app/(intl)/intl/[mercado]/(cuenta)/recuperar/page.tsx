import type { Metadata } from "next";
import { PaginaRecuperar } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: `${textosDe("intl").recuperar.meta} | CalcularYa`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function RecuperarPage() {
  return <PaginaRecuperar sitio="intl" />;
}
