import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
export const revalidate = 3600;

type Props = { params: Promise<{ mercado: string; slug: string }> };

// Lee el mismo registro filtrado que el layout: si uno se apaga y el otro no, las hojas se generan
// igual (docs/adr/0001-spike-next16.md, punto 5). dynamicParams queda en true: un slug que no está
// llega acá y notFound() pinta el 404 intl.
export function generateStaticParams({ params }: { params: { mercado: string } }) {
  if (!intlActivo()) return [];
  const modo = modoPublicacion();
  const m = registro.mercados(modo).find((x) => x.codigo === params.mercado);
  if (!m) return [];
  if (m.codigo === "global") return PAGINAS_GLOBALES.map((slug) => ({ slug }));
  const calculadoras = registro.calculadorasPublicables(m.codigo, hoyEn(m), modo).map((c) => ({ slug: c.definicion.slug }));
  return [...calculadoras, ...PAGINAS_MERCADO.map((slug) => ({ slug }))];
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
      const { id, campos, resultado } = registro.calculadora(ctx.mercado.codigo, slug)!.definicion;
      const definicion = { id, campos, resultado };
      const Cliente = (props: PropsCalculadora) => <CalculadoraIntl mercado={ctx.mercado.codigo} slug={slug} definicion={definicion} {...props} />;
      return <PaginaCalculadora ctx={ctx} pagina={r.pagina} Cliente={Cliente} />;
    }
  }
}
