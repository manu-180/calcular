import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GRAMATICA } from "@/motor/i18n/gramatica";
import { rellenarHoras, textosHoras } from "@/motor/i18n/horas";
import { conArticulo, productoDe } from "@/motor/horas/productos";
import { resolverRuta, SLUG_HORAS, type RutaResuelta } from "@/motor/horas/rutas";
import type { IndiceHoras } from "@/motor/horas/tipos";
import { lugarEnPagina, nombreEnPagina } from "@/motor/horas/ui/datos-cliente";
import { formatoHoras } from "@/motor/horas/ui/formato";
import { PaginaHoras } from "@/motor/horas/ui/PaginaHoras";
import { hreflangHoras, urlHoras } from "@/motor/horas/ui/seo";
import { elegirTitulo, hreflangVaAlSitemap, metadataDe } from "@/motor/seo";
import type { CodigoMercado, Idioma } from "@/motor/tipos";
import { contextoSitio, type ContextoSitio } from "@/motor/ui/contexto";
import { registro } from "@/paises";
import { indicePublicado } from "./datos";

// «¿Cuántas horas de trabajo cuesta?», compartida por las carpetas de cada slug de SLUG_HORAS (una por
// idioma): /<m>/<slug> es el índice, /<m>/<slug>/<producto> la página de cada producto (indexable) y
// /<m>/<slug>/<producto>/<iso> la tarjeta de un país para compartir (noindex, canonical al producto, OG
// del país). Todo en el path y no en la query, así cada variante queda en caché (ISR).

type Props = { params: Promise<{ mercado: string; p?: string[] }> };

type Resuelto = { ctx: ContextoSitio; indice: IndiceHoras; ruta: RutaResuelta };

async function resolver(idioma: Idioma, mercado: string, p: string[] | undefined): Promise<Resuelto | null> {
  const ctx = contextoSitio(registro, mercado as CodigoMercado);
  if (!ctx || ctx.mercado.idioma !== idioma) return null;
  const ruta = resolverRuta(p);
  if (!ruta) return null;
  const indice = await indicePublicado();
  if (ruta.pais && !indice.filas.some((f) => f.iso === ruta.pais)) return null;
  return { ctx, indice, ruta };
}

export function crearPaginaHoras(idioma: Idioma) {
  const slug = SLUG_HORAS[idioma];

  // Nada en el build: cada edición se pinta al primer pedido y queda en caché con el revalidate.
  function generateStaticParams() {
    return [];
  }

  async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { mercado, p } = await params;
    const r = await resolver(idioma, mercado, p);
    if (!r) return {};
    const m = r.ctx.mercado;
    const t = textosHoras(m.idioma, m.trato, m.locale);
    const n = r.indice.filas.length;
    const global = m.codigo === "global";
    const nombre = global ? "" : nombreEnPagina(m.pais.toUpperCase(), m.idioma, m.locale);
    const en = global ? "" : lugarEnPagina(nombre, m.idioma);
    const enMinuscula = global ? "" : GRAMATICA[m.idioma].en(nombre);
    const prod = productoDe(r.ruta.producto)!;
    const art = conArticulo(prod, m.idioma, m.locale);
    const vars = { pais: nombre, en: enMinuscula, producto: art, n };
    let title: string;
    let description: string;
    if (r.ruta.esIndice) {
      title = elegirTitulo((global ? t.seo.tituloGlobal : t.seo.titulo).map((x) => rellenarHoras(x, vars)));
      description = rellenarHoras(global ? t.seo.descripcionGlobal : t.seo.descripcion, vars);
    } else {
      title = elegirTitulo((global ? t.seo.tituloProductoGlobal : t.seo.tituloProducto).map((x) => rellenarHoras(x, vars)));
      const propia = r.indice.filas.find((f) => f.iso === m.pais.toUpperCase())?.celdas[prod.id];
      description =
        !global && propia
          ? rellenarHoras(t.seo.descripcionProducto, { ...vars, en, horas: formatoHoras(m.locale, propia.horas).texto })
          : rellenarHoras(t.seo.descripcionProductoGlobal, vars);
    }
    const ruta = r.ruta.esIndice ? slug : `${slug}/${prod.id}`;
    const idiomas = hreflangHoras(registro, r.ctx.modo, r.ruta.esIndice ? undefined : prod.id);
    const base = urlHoras(m);
    const meta = metadataDe({
      mercado: m,
      slug: ruta,
      title,
      description,
      ...(idiomas && !hreflangVaAlSitemap(idiomas) ? { idiomas } : {}),
      imagen: `${base}/og?p=${prod.id}${r.ruta.pais ? `&pais=${r.ruta.pais}` : ""}`,
    });
    if (!r.ruta.pais) return meta;
    // La tarjeta de un país no se indexa (canonical al producto) y su vista previa es la de ese país.
    const fila = r.indice.filas.find((f) => f.iso === r.ruta.pais)!;
    const celda = fila.celdas[prod.id];
    const enPais = lugarEnPagina(nombreEnPagina(fila.iso, m.idioma, m.locale), m.idioma);
    const titulo = celda ? rellenarHoras(t.compartir.texto, { en: enPais, producto: art, horas: formatoHoras(m.locale, celda.horas).texto }) : title;
    return { ...meta, title: { absolute: titulo }, robots: { index: false, follow: true }, openGraph: { ...meta.openGraph, url: `${base}/${prod.id}/${fila.iso.toLowerCase()}`, title: titulo } };
  }

  async function Pagina({ params }: Props) {
    const { mercado, p } = await params;
    const r = await resolver(idioma, mercado, p);
    if (!r || !r.indice.filas.length) notFound();
    return <PaginaHoras ctx={r.ctx} indice={r.indice} producto={r.ruta.producto} esIndice={r.ruta.esIndice} pais={r.ruta.pais} />;
  }

  return { generateStaticParams, generateMetadata, Pagina };
}
