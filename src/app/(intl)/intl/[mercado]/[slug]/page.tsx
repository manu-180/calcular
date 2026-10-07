import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { esPaginaGlobal, PAGINAS_GLOBALES, PAGINAS_MERCADO } from "@/motor/paginas";
import { hreflangDe, metadataDe } from "@/motor/seo";
import { intlActivo, modoPublicacion } from "@/motor/sitio";
import type { CodigoMercado, PropsCalculadora } from "@/motor/tipos";
import { contextoSitio, type ContextoSitio } from "@/motor/ui/contexto";
import { PaginaFuentes, PaginaNovedades } from "@/motor/ui/Fuentes";
import { PAGINAS_LEGALES, PaginaLegalVista } from "@/motor/ui/Legales";
import { PaginaCalculadora } from "@/motor/ui/PaginaCalculadora";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";
import { CalculadoraIntl } from "./calculadora-intl";

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

function resolver(ctx: ContextoSitio, slug: string) {
  const m = ctx.mercado;
  if (m.codigo === "global") return esPaginaGlobal(slug) ? ({ tipo: "legal", slug } as const) : null;
  if (slug === "fuentes" || slug === "novedades") return { tipo: slug } as const;
  const pagina = registro.pagina(m.codigo, slug, ctx.fecha, ctx.modo);
  return pagina ? ({ tipo: "calculadora", pagina } as const) : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mercado, slug } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const r = ctx ? resolver(ctx, slug) : null;
  if (!ctx || !r) return {};
  const m = ctx.mercado;
  switch (r.tipo) {
    case "legal": {
      const p = PAGINAS_LEGALES[r.slug];
      return metadataDe({ mercado: m, slug, title: p.title, description: p.description });
    }
    case "fuentes":
      return metadataDe({ mercado: m, slug, title: ctx.textos.fuentes.titulo(m.nombre), description: ctx.textos.fuentes.description(m.nombre) });
    case "novedades":
      return metadataDe({ mercado: m, slug, title: ctx.textos.novedades.titulo(m.nombre), description: ctx.textos.novedades.description(m.nombre) });
    case "calculadora": {
      const { contenido, calculadora, equivalentes } = r.pagina;
      return metadataDe({ mercado: m, slug, title: contenido.title, description: contenido.description, idiomas: hreflangDe(calculadora.concepto, equivalentes) });
    }
  }
}

export default async function PaginaDeMercado({ params }: Props) {
  const { mercado, slug } = await params;
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  const r = ctx ? resolver(ctx, slug) : null;
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
