import type { Metadata } from "next";
import { PaginaLogin, type SP } from "@/components/cuenta/paginas/Acceso";
import { textosDe } from "@/lib/cuenta/textos";

export const metadata: Metadata = {
  title: textosDe("ar").login.meta,
  robots: { index: false, follow: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<SP> }) {
  return <PaginaLogin sitio="ar" sp={await searchParams} />;
}
