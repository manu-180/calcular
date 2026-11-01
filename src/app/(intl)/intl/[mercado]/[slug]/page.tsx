import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { familiaDeConcepto } from "@/lib/pagos/ofertas-intl";
import { PAGINAS_GLOBALES, PAGINAS_MERCADO } from "@/motor/paginas";
import { intlActivo, modoPublicacion } from "@/motor/sitio";
import type { CodigoMercado, PropsCalculadora } from "@/motor/tipos";
import { contextoSitio } from "@/motor/ui/contexto";
import { PaginaFuentes, PaginaNovedades } from "@/motor/ui/Fuentes";
import { PaginaLegalVista } from "@/motor/ui/Legales";
import { metadatosDe, resolverPagina } from "@/motor/ui/metadatos";
import { PaginaCalculadora } from "@/motor/ui/PaginaCalculadora";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";
import { CalculadoraIntl } from "./calculadora-intl";

// Calculadora, fuentes y novedades dependen de la fecha del mercado (ver revalidate en layout.tsx).
export const revalidate = 86400;

type Props = { params: Promise<{ mercado: string; slug: string }> };

// En el build solo va lo que más se visita: las calculadoras con algo para vender (una familia de
// oferta) y las páginas del mercado. El resto (universales de 190 países, legales sin oferta) se pinta
// al primer pedido y queda en caché con el mismo revalidate: dynamicParams queda en true (default),
// y un slug que no existe o que no se publica hoy cae en notFound() de abajo, con el 404 intl.
// Lee el mismo registro filtrado que el layout (docs/adr/0001-spike-next16.md, punto 5).
export function generateStaticParams({ params }: { params: { mercado: string } }) {
  if (!intlActivo()) return [];
  const modo = modoPublicacion();
  const m = registro.mercados(modo).find((x) => x.codigo === params.mercado);
  if (!m) return [];
  if (m.codigo === "global") return PAGINAS_GLOBALES.map((slug) => ({ slug }));
  const calculadoras = registro
    .calculadorasPublicables(m.codigo, hoyEn(m), modo)
    .filter((c) => familiaDeConcepto(c.definicion.concepto) !== null)
    .map((c) => ({ slug: c.definicion.slug }));
  // novedades tiene ruta propia (../novedades/page.tsx), que le gana a [slug]: no se genera dos veces.
  return [...calculadoras, ...PAGINAS_MERCADO.filter((slug) => slug !== "novedades").map((slug) => ({ slug })), ...PAGINAS_GLOBALES.map((slug) => ({ slug }))];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado, slug } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const r = ctx ? resolverPagina(ctx, slug) : null;
  return ctx && r ? metadatosDe(ctx, r) : {};
}

export default async function PaginaDeMercado({ params }: Props) {
  const { mercado, slug } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const r = ctx ? resolverPagina(ctx, slug) : null;
  if (!ctx || !r) notFound();
  switch (r.tipo) {
    case "legal":
      return <PaginaLegalVista ctx={ctx} slug={r.slug} />;
    case "fuentes":
      return <PaginaFuentes ctx={ctx} />;
    case "novedades":
      return <PaginaNovedades ctx={ctx} />;
    case "calculadora": {
      // La parte visible viaja como props; calcular() la baja el navegador aparte (calculadora-intl.tsx).
      const entrada = registro.calculadora(ctx.mercado.codigo, slug)!;
      const { id, campos, resultado, tablas } = entrada.definicion;
      const definicion = { id, campos, resultado, ...(tablas ? { tablas } : {}) };
      const universal = r.pagina.universal;
      const traduccion = entrada.traduccion;
      const Cliente = (props: PropsCalculadora) => (
        <CalculadoraIntl
          mercado={ctx.mercado.codigo}
          slug={slug}
          definicion={definicion}
          {...(universal ? { universal } : {})}
          {...(traduccion ? { traduccion } : {})}
          {...props}
        />
      );
      return <PaginaCalculadora ctx={ctx} pagina={r.pagina} Cliente={Cliente} />;
    }
  }
}
