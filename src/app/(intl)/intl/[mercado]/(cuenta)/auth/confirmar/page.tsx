import type { Metadata } from "next";
import { PaginaConfirmar, type SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: `${textosDe("intl").confirmar.meta} | CalcularYa`,
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export const dynamic = "force-dynamic";

export default async function ConfirmarPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaConfirmar sitio="intl" sp={await searchParams} />;
}
