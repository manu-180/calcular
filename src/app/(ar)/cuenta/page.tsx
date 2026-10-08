import type { Metadata } from "next";
import { PaginaCuenta } from "@/components/cuenta/paginas/Cuenta";
import type { SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: textosDe("ar").cuenta.meta,
  robots: { index: false, follow: false },
};

export default function CuentaPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaCuenta sitio="ar" searchParams={searchParams} />;
}
