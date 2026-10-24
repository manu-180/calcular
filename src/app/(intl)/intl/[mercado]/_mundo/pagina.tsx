import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { textosMundo } from "@/motor/i18n/mundo";
import { codificarCarga, diaDeCarga, normalizarCarga } from "@/motor/mundo/calculo";
import { SLUG_MUNDO } from "@/motor/mundo/rutas";
import type { CargaCompartida, GrillaMundo } from "@/motor/mundo/tipos";
import { PaginaMundo } from "@/motor/mundo/ui/PaginaMundo";
import { hreflangMundo, urlMundo } from "@/motor/mundo/ui/seo";
import { elegirTitulo, hreflangVaAlSitemap, metadataDe, rutaIntl } from "@/motor/seo";
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

type Resuelto = { ctx: ContextoSitio; grilla: GrillaMundo; carga: CargaCompartida | null; canonica: boolean };

// El `c` llega ya decodificado por Next y la forma canónica solo usa [a-zA-Z0-9.-]: nada que
// decodificar de nuevo (un decodeURIComponent sobre «%» tiraba y daba 500). Una carga válida que no
// está en su forma canónica (mayúsculas, ceros a la izquierda, fuera de la escala redondeada) va con
// 308 a la canónica; una inválida es 404. Así cada tarjeta tiene una sola URL en caché.
async function resolver(idioma: Idioma, mercado: string, c: string[] | undefined): Promise<Resuelto | null> {
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.idioma !== idioma) return null;
  const grilla = await grillaPublicada();
  if (!c?.length) return { ctx, grilla, carga: null, canonica: true };
  if (c.length > 1) return null;
  const n = normalizarCarga(c[0], grilla);
  return n ? { ctx, grilla, carga: n.carga, canonica: n.canonica } : null;
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
    const r = await resolver(idioma, mercado, c);
    if (!r || !r.canonica) return {};
    const m = r.ctx.mercado;
    const t = textosMundo(m.idioma, m.trato, m.locale);
    const n = r.grilla.paises.length;
    const codigo = r.carga ? codificarCarga(r.carga) : null;
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
      imagen: `${base}/og${codigo ? `?c=${codigo}` : ""}`,
    });
    if (!r.carga) return meta;
    // El duelo no se indexa (canonical a la página) y su vista previa es la tarjeta del amigo.
    const anio = Number(r.ctx.fecha.slice(0, 4));
    const dia = diaDeCarga(r.carga, anio);
    const titulo = dia > 0 ? t.tarjeta.texto(fechaCorta(dia, anio, m.locale)) : t.cero.texto;
    return {
      ...meta,
      title: { absolute: titulo },
      robots: { index: false, follow: true },
      openGraph: { ...meta.openGraph, url: `${base}/${codigo}`, title: titulo },
    };
  }

  async function Pagina({ params }: Props) {
    const { mercado, c } = await params;
    const r = await resolver(idioma, mercado, c);
    if (!r || !r.grilla.paises.length) notFound();
    if (r.carga && !r.canonica) permanentRedirect(rutaIntl(r.ctx.mercado.codigo, `${slug}/${codificarCarga(r.carga)}`));
    return <PaginaMundo ctx={r.ctx} grilla={r.grilla} carga={r.carga} />;
  }

  return { generateStaticParams, generateMetadata, Pagina };
}
