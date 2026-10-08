import type { Metadata } from "next";
import { PaginaRecuperar } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: textosDe("ar").recuperar.meta,
  robots: { index: false, follow: false },
};

export default function RecuperarPage() {
  return <PaginaRecuperar sitio="ar" />;
}
