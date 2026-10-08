import type { Metadata } from "next";
import { PaginaConfirmar, type SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: textosDe("ar").confirmar.meta,
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function ConfirmarPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaConfirmar sitio="ar" sp={await searchParams} />;
}
