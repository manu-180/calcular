import type { Metadata, Viewport } from "next";
import { Geist, Noto_Sans_Arabic } from "next/font/google";
import { origenPublicoIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { AcordeonesFluidos } from "@/components/AcordeonesFluidos";
import { ScriptExperimentos } from "@/components/Experimentos";
import { Rastreador } from "@/components/Rastreador";
import { CapturaLlegada } from "@/motor/compartir/CapturaLlegada";
import { EncabezadoIntl, EXTERNOS } from "@/components/shell/EncabezadoIntl";
import { PieIntl } from "@/components/shell/PieIntl";
import { contextoSitio, listaCompacta } from "@/motor/ui/contexto";
import { ProveedorPaises } from "@/motor/ui/ListaPaises";
import "@/components/shell/shell.css";
import "@/motor/ui/estilos.css";
// Arranque por país, selector, datos vivos y novedades (frente aparte, para no pisar estilos.css).
import "@/motor/ui/estilos-inicio.css";
import { registro } from "@/paises";
import { direccionDe, etiquetaIdioma } from "@/motor/i18n/direccion";

// optional y no swap: si Geist no llegó para el primer pintado se queda la fallback ajustada por
// next/font, y el H1 (el LCP de casi todas las páginas) no se vuelve a pintar al cambiar de fuente.
// latin-ext trae las letras del checo (ř, ě, ů); con unicode-range solo se baja si la página las usa.
// latin-ext trae la ő y la ű del húngaro; con unicode-range solo se baja si la página las usa.
const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext", "latin-ext"], display: "optional" });
// Geist no trae árabe. Sin preload y con el unicode-range del subset, el navegador baja la fuente solo
// en páginas con texto árabe: el resto de los mercados no paga nada por declararla acá.
const arabe = Noto_Sans_Arabic({ variable: "--font-arabe", subsets: ["arabic"], display: "swap", preload: false });

// La fecha de referencia (hoyEn, en la zona del mercado) decide tramos, avisos y qué calculadoras
// se publican. Sin esto la página quedaba con el día del build hasta el próximo deploy. Next toma el
// revalidate más bajo entre layout y página, así que alcanza con este para todo el árbol intl; las
// páginas lo repiten para que nadie lo pierda al mover el layout.
export const revalidate = 3600;

// Sin dynamicParams = false a propósito: anularía el de las hojas y un slug desconocido caería en
// el 404 de la raíz (marca de calcular.ar) en vez del not-found intl (docs/adr/0001-spike-next16.md).
export function generateStaticParams() {
  if (!intlActivo()) return [];
  return registro.mercados(modoPublicacion()).map((m) => ({ mercado: m.codigo }));
}

const ICONO =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#059669"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d1fae5"/></linearGradient></defs><rect x="16" y="16" width="480" height="480" rx="116" fill="url(#t)"/><rect x="56" y="40" width="400" height="220" rx="96" fill="#ffffff" opacity="0.12"/><rect x="136" y="186" width="240" height="58" rx="29" fill="url(#b)"/><rect x="136" y="268" width="240" height="58" rx="29" fill="url(#b)"/></svg>',
  );

export async function generateMetadata({ params }: { params: Promise<{ mercado: string }> }): Promise<Metadata> {
  const { mercado } = await params;
  const m = registro.pais(mercado as CodigoMercado)?.mercado;
  const indexable = m?.estado === "publicado" && modoPublicacion() === "produccion";
  return {
    metadataBase: new URL(origenPublicoIntl()),
    title: NOMBRE_SITIO_INTL,
    applicationName: NOMBRE_SITIO_INTL,
    authors: [{ name: "Manuel Navarro" }],
    formatDetection: { telephone: false, email: false, address: false },
    robots: indexable
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
      : { index: false, follow: false },
    // Google muestra el favicon en el resultado solo si puede bajarlo de una URL estable en PNG/ICO (el SVG no
    // está en su lista y un data: no se puede pedir): /og/marca es el mismo signo en PNG de 512. El SVG
    // queda para los navegadores, que lo prefieren nítido.
    icons: {
      icon: [
        { url: "/og/marca", type: "image/png", sizes: "512x512" },
        { url: ICONO, type: "image/svg+xml" },
      ],
      apple: [{ url: "/og/marca", type: "image/png", sizes: "512x512" }],
    },
    ...(Object.keys(verificacion).length ? { verification: verificacion } : {}),
  };
}

// Verificación de Bing Webmaster, Yandex Webmaster y Naver Search Advisor (los motores de KR, RU, KZ, UZ,
// CZ...). Cada uno da un token al alta; va por env y no por código para que el alta la haga Manuel y el
// HTML no lleve metas vacías. Google ya está verificado por DNS.
const verificacion: NonNullable<Metadata["verification"]> = {
  ...(process.env.NEXT_PUBLIC_VERIFICACION_YANDEX ? { yandex: process.env.NEXT_PUBLIC_VERIFICACION_YANDEX } : {}),
  other: {
    ...(process.env.NEXT_PUBLIC_VERIFICACION_BING ? { "msvalidate.01": process.env.NEXT_PUBLIC_VERIFICACION_BING } : {}),
    ...(process.env.NEXT_PUBLIC_VERIFICACION_NAVER ? { "naver-site-verification": process.env.NEXT_PUBLIC_VERIFICACION_NAVER } : {}),
  },
};
if (!Object.keys(verificacion.other!).length) delete verificacion.other;

export const viewport: Viewport = {
  themeColor: "#fafaf9",
};

export default async function LayoutIntl({ children, params }: { children: React.ReactNode; params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  // /intl/global/404/... (paths que no existen) y cualquier valor raro del segmento caen en el
  // chrome de global: el 404 intl siempre tiene header, footer y lang.
  const ctx = contextoSitio(registro, mercado as CodigoMercado) ?? contextoSitio(registro, "global")!;
  return (
    // suppressHydrationWarning: ScriptExperimentos le pone data-x-* a <html> antes de que React hidrate.
    <html lang={etiquetaIdioma(ctx.mercado.locale)} dir={direccionDe(ctx.mercado.idioma)} className={`${geist.variable} ${arabe.variable}`} suppressHydrationWarning>
      <head>
        <ScriptExperimentos />
      </head>
      <body className="cy-cuerpo">
        <a href="#contenido" className="cy-saltar">
          {ctx.textos.saltar}
        </a>
        <ProveedorPaises paises={listaCompacta(ctx, EXTERNOS)}>
          <div className="cy-marco">
            <EncabezadoIntl ctx={ctx} />
            <main id="contenido" className="cy-principal">
              {children}
            </main>
            <PieIntl ctx={ctx} />
          </div>
        </ProveedorPaises>
        <CapturaLlegada />
        <Rastreador sitio="intl" mercado={ctx.mercado.codigo} />
        <AcordeonesFluidos />
      </body>
    </html>
  );
}
