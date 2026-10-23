import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { textosMundo } from "@/motor/i18n/mundo";
import { decodificarCarga } from "@/motor/mundo/calculo";
import { SLUG_MUNDO } from "@/motor/mundo/rutas";
import type { CargaCompartida } from "@/motor/mundo/tipos";
import { PaginaMundo } from "@/motor/mundo/ui/PaginaMundo";
import { hreflangMundo, urlMundo } from "@/motor/mundo/ui/seo";
import { elegirTitulo, hreflangVaAlSitemap, metadataDe } from "@/motor/seo";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio, type ContextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";
import { grillaPublicada } from "./datos";

// «Tu sueldo en el mundo», compartida por las carpetas de cada slug de SLUG_MUNDO (una por idioma):
// /<m>/<slug> es la página y /<m>/<slug>/<c> el duelo (el `c` de un link compartido). Cada carpeta
// solo responde en las ediciones de su idioma; en otra da el 404 intl. El duelo va en el path y no en
// ?c= para que la página siga cacheada (ISR): una query la volvería dinámica en cada pedido y la OG
// del link tiene que ser la del amigo.

type Props = { params: Promise<{ mercado: string; c?: string[] }> };

function resolver(idioma: Idioma, mercado: string, c: string[] | undefined): { ctx: ContextoSitio; carga: CargaCompartida | null } | null {
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.idioma !== idioma) return null;
  if (!c?.length) return { ctx, carga: null };
  if (c.length > 1) return null;
  const carga = decodificarCarga(decodeURIComponent(c[0]));
  return carga ? { ctx, carga } : null;
}

function fechaCorta(dia: number, anio: number, locale: string): string {
  const d = new Date(Date.UTC(anio, 0, dia));
  const texto = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "UTC" }).format(d);
  return locale.toLowerCase().startsWith("fr") && d.getUTCDate() === 1 ? texto.replace(/^1(?=\s)/, "1er") : texto;
}

export function crearPaginaMundo(idioma: Idioma) {
  const slug = SLUG_MUNDO[idioma];

  // Nada en el build: cada edición se pinta al primer pedido y queda en caché con el revalidate de la
  // carpeta (docs de generateStaticParams: lista vacía = estático al primer pedido). Así diez carpetas
  // × todas las ediciones no suman cientos de páginas (casi todas 404) al build.
  function generateStaticParams() {
    return [];
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mercado, c } = await params;
    const r = resolver(idioma, mercado, c);
    if (!r) return {};
    const m = r.ctx.mercado;
    const t = textosMundo(m.idioma, m.trato, m.locale);
    const grilla = await grillaPublicada();
    const n = grilla.paises.length;
    const title = elegirTitulo(m.codigo === "global" ? t.seo.tituloGlobal : t.seo.titulo(m.nombre));
    const description = m.codigo === "global" ? t.seo.descripcionGlobal(n) : t.seo.descripcion(m.nombre, n);
    const idiomas = hreflangMundo(registro, r.ctx.modo);
    const base = urlMundo(m);
    const meta = metadataDe({
      mercado: m,
      slug,
      title,
      description,
      ...(idiomas && !hreflangVaAlSitemap(idiomas) ? { idiomas } : {}),
      imagen: `${base}/og${r.carga ? `?c=${encodeURIComponent(c![0])}` : ""}`,
    });
    if (!r.carga) return meta;
    // El duelo no se indexa (canonical a la página) y su vista previa es la tarjeta del amigo.
    const anio = Number(r.ctx.fecha.slice(0, 4));
    const titulo = t.tarjeta.texto(fechaCorta(r.carga.dia, anio, m.locale));
    return {
      ...meta,
      title: { absolute: titulo },
      robots: { index: false, follow: true },
      openGraph: { ...meta.openGraph, url: `${base}/${c![0]}`, title: titulo },
    };
  }

  async function Pagina({ params }: Props) {
    const { mercado, c } = await params;
    const r = resolver(idioma, mercado, c);
    if (!r) notFound();
    const grilla = await grillaPublicada();
    if (!grilla.paises.length) notFound();
    return <PaginaMundo ctx={r.ctx} grilla={grilla} carga={r.carga} />;
  }

  return { generateStaticParams, generateMetadata, Pagina };
}
