import type { Metadata } from "next";
import { PaginaLogin, type SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: `${textosDe("intl").login.meta} | CalcularYa`,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaLogin sitio="intl" sp={await searchParams} />;
}
