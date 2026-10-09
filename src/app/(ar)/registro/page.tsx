import type { Metadata } from "next";
import { PaginaRegistro, type SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: textosDe("ar").registro.meta,
  robots: { index: false, follow: false },
};

export default async function RegistroPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaRegistro sitio="ar" sp={await searchParams} />;
}
