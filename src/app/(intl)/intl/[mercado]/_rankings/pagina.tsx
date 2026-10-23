import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { textosRankings } from "@/motor/i18n/rankings";
import { rankingDeSlug, SLUG_RANKINGS, slugRanking } from "@/motor/rankings/rutas";
import { hreflangIndice, hreflangRanking } from "@/motor/rankings/seo";
import { PaginaIndice, PaginaRanking } from "@/motor/rankings/ui/Paginas";
import { elegirTitulo, hreflangVaAlSitemap, metadataDe, urlIntl } from "@/motor/seo";
import { anchoVisual } from "@/motor/ancho";
import type { Idioma } from "@/motor/tipos";
import { registro } from "@/paises";
import { resolverRanking, resolverRankings } from "./datos";

// Índice de rankings (/<m>/<índice>) y cada ranking (/<m>/<índice>/<ranking>), compartidos por las
// carpetas de cada slug de SLUG_RANKINGS (una por idioma). Cada carpeta solo responde en las
// ediciones de su idioma; en otra da el 404 intl. Nada se prerenderiza en el build: cada edición se
// pinta al primer pedido y queda en caché con el revalidate de la carpeta (ISR).

type PropsIndice = { params: Promise<{ mercado: string }> };
type PropsRanking = { params: Promise<{ mercado: string; ranking: string }> };

const conPais = (base: readonly string[], pais: string | null) => (pais ? [...base.map((b) => `${b} | ${pais}`), ...base] : base);

function descripcionCon(frase: string | null, base: string): string {
  if (!frase) return base;
  const larga = `${frase}. ${base}`;
  return anchoVisual(larga) <= 160 ? larga : base;
}

export function crearIndiceRankings(idioma: Idioma) {
  function generateStaticParams() {
    return [];
  }

  async function generateMetadata({ params }: PropsIndice): Promise<Metadata> {
    const { mercado } = await params;
    const r = await resolverRankings(idioma, mercado);
    if (!r) return {};
    const m = r.ctx.mercado;
    const t = textosRankings(m.idioma, m.trato, m.locale);
    const idiomas = hreflangIndice(registro, r.ctx.modo);
    const v = r.vistas[0].variantes[r.vistas[0].porDefecto];
    return metadataDe({
      mercado: m,
      slug: SLUG_RANKINGS[idioma],
      title: elegirTitulo(conPais(t.seo.titulo, m.codigo === "global" ? null : m.nombre)),
      description: t.seo.descripcion(r.grilla.paises.length),
      ...(idiomas && !hreflangVaAlSitemap(idiomas) ? { idiomas } : {}),
      imagen: `${urlIntl(m.codigo, SLUG_RANKINGS[idioma])}/og?r=${r.vistas[0].id}&v=${v.id}`,
    });
  }

  async function Pagina({ params }: PropsIndice) {
    const { mercado } = await params;
    const r = await resolverRankings(idioma, mercado);
    if (!r) notFound();
    return <PaginaIndice ctx={r.ctx} grilla={r.grilla} vistas={r.vistas} />;
  }

  return { generateStaticParams, generateMetadata, Pagina };
}

export function crearPaginaRanking(idioma: Idioma) {
  function generateStaticParams() {
    return [];
  }

  async function resolver(mercado: string, slug: string) {
    const id = rankingDeSlug(idioma, slug);
    return id ? resolverRanking(idioma, mercado, id) : null;
  }

  async function generateMetadata({ params }: PropsRanking): Promise<Metadata> {
    const { mercado, ranking } = await params;
    const r = await resolver(mercado, ranking);
    if (!r) return {};
    const m = r.ctx.mercado;
    const t = textosRankings(m.idioma, m.trato, m.locale);
    const tr = t.rankings[r.vista.id];
    const v = r.vista.variantes[r.vista.porDefecto];
    const idiomas = hreflangRanking(registro, r.ctx.modo, r.vista.id);
    return metadataDe({
      mercado: m,
      slug: slugRanking(idioma, r.vista.id),
      title: elegirTitulo(conPais(tr.seo, m.codigo === "global" ? null : m.nombre)),
      description: descripcionCon(v.esPropia ? v.frase : null, tr.descripcion(r.vista.total)),
      ...(idiomas && !hreflangVaAlSitemap(idiomas) ? { idiomas } : {}),
      imagen: `${urlIntl(m.codigo, SLUG_RANKINGS[idioma])}/og?r=${r.vista.id}&v=${v.id}`,
    });
  }

  async function Pagina({ params }: PropsRanking) {
    const { mercado, ranking } = await params;
    const r = await resolver(mercado, ranking);
    if (!r) notFound();
    return <PaginaRanking ctx={r.ctx} grilla={r.grilla} vista={r.vista} vistas={r.vistas} />;
  }

  return { generateStaticParams, generateMetadata, Pagina };
}

