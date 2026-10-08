import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { ldOrganizacion, origenPublicoIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import type { CodigoMercado } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { Encabezado, JsonLd, Pie } from "@/motor/ui/Sitio";
import "@/motor/ui/estilos.css";
import { registro } from "@/paises";

// optional y no swap: si Geist no llegó para el primer pintado se queda la fallback ajustada por
// next/font, y el H1 (el LCP de casi todas las páginas) no se vuelve a pintar al cambiar de fuente.
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "optional" });

// Sin dynamicParams = false a propósito: anularía el de las hojas y un slug desconocido caería en
// el 404 de la raíz (marca de calcular.ar) en vez del not-found intl (docs/adr/0001-spike-next16.md).
export function generateStaticParams() {
  if (!intlActivo()) return [];
  return registro.mercados(modoPublicacion()).map((m) => ({ mercado: m.codigo }));
}

const ICONO =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="9" fill="#1E2A44"/><path d="M9 12.5h14" stroke="#F6F1E6" stroke-width="2.4" stroke-linecap="round"/><path d="M9 19.5h8.5" stroke="#E8A33D" stroke-width="2.4" stroke-linecap="round"/><circle cx="22.5" cy="19.5" r="1.6" fill="#E8A33D"/></svg>',
  );

export async function generateMetadata({ params }: { params: Promise<{ mercado: string }> }): Promise<Metadata> {
  const { mercado } = await params;
  const m = registro.pais(mercado as CodigoMercado)?.mercado;
  const indexable = m?.estado === "publicado" && modoPublicacion() === "produccion";
  return {
    metadataBase: new URL(origenPublicoIntl()),
    applicationName: NOMBRE_SITIO_INTL,
    authors: [{ name: "Manuel Navarro" }],
    formatDetection: { telephone: false, email: false, address: false },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    icons: { icon: [{ url: ICONO, type: "image/svg+xml" }] },
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
};

const ORGANIZACION = ldOrganizacion();

export default async function LayoutIntl({ children, params }: { children: React.ReactNode; params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  // /intl/global/404/... (paths que no existen) y cualquier valor raro del segmento caen en el
  // chrome de global: el 404 intl siempre tiene header, footer y lang.
  const ctx = contextoSitio(registro, mercado as CodigoMercado) ?? contextoSitio(registro, "global")!;
  return (
    <html lang={ctx.mercado.locale} className={geist.variable}>
      <body className="cy-cuerpo">
        <JsonLd datos={ORGANIZACION} />
        <a href="#contenido" className="cy-saltar">
          {ctx.textos.saltar}
        </a>
        <div className="cy-marco">
          <Encabezado ctx={ctx} />
          <main id="contenido" className="cy-principal">
            {children}
          </main>
          <Pie ctx={ctx} />
        </div>
      </body>
    </html>
  );
}
