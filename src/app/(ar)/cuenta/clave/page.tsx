import type { Metadata } from "next";
import { PaginaClave } from "@/components/cuenta/paginas/Cuenta";
import type { SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: textosDe("ar").clave.meta,
  robots: { index: false, follow: false },
};

export default function ClavePage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaClave sitio="ar" searchParams={searchParams} />;
}
