import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Rastreador } from "@/components/Rastreador";
import { SCRIPT_OPCIONES } from "@/motor/embed/opciones";
import { origenPublicoIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";
import "@/motor/ui/estilos.css";
import "@/motor/embed/estilos-embed.css";

// Layout raíz propio y no el de src/app/(intl)/intl/[mercado]: ese lleva el header y el footer del
// sitio, y el embed va dentro del blog de otra persona (ver src/motor/embed/rutas.ts para cómo llega
// la URL pública /<m>/embed/<slug> hasta acá).
// latin-ext trae las letras del checo (ř, ě, ů); con unicode-range solo se baja si la página las usa.
// latin-ext trae la ő y la ű del húngaro; con unicode-range solo se baja si la página las usa.
const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext", "latin-ext"], display: "optional" });

export const revalidate = 86400;

export function generateStaticParams() {
  if (!intlActivo()) return [];
  return registro.mercados(modoPublicacion()).map((m) => ({ mercado: m.codigo }));
}

export const metadata: Metadata = {
  metadataBase: new URL(origenPublicoIntl()),
  title: NOMBRE_SITIO_INTL,
  robots: { index: false, follow: true },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default async function LayoutEmbed({ children, params }: { children: React.ReactNode; params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado) ?? contextoSitio(registro, "global")!;
  return (
    // suppressHydrationWarning: SCRIPT_OPCIONES le agrega data-tema y --cye-acento a <html> antes de que React hidrate.
    <html lang={ctx.mercado.locale} className={`${geist.variable} cye-html`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_OPCIONES }} />
      </head>
      <body className="cy-cuerpo cye">
        {children}
        <Rastreador sitio="intl" mercado={ctx.mercado.codigo} />
      </body>
    </html>
  );
}
