import type { Metadata } from "next";
import { PaginaClave } from "@/components/cuenta/paginas/Cuenta";
import type { SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: `${textosDe("intl").clave.meta} | CalcularYa`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function ClavePage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaClave sitio="intl" searchParams={searchParams} />;
}
