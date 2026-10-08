import { CONCEPTOS, esConcepto } from "./conceptos";
import type { Equivalente } from "./registro";
import { hreflangARActivo, NOMBRE_SITIO_INTL, origenAR, origenIntl } from "./sitio";
import type { CodigoMercado, FechaISO, Mercado, PreguntaFrecuente } from "./tipos";

// Sin la variable el árbol intl no se genera, así que este valor solo se usa en checks y tipos.
const ORIGEN_POR_DEFECTO = "https://calcularya.com";

// Lo que Google muestra sin cortar en el resultado. Los checks (check_seo_intl.ts) usan los mismos.
export const LARGO_TITULO = 60;
export const LARGO_DESCRIPCION = 160;

export function origenPublicoIntl(): string {
  return origenIntl() ?? ORIGEN_POR_DEFECTO;
}

// Path público, nunca el interno /intl/...: el rewrite por host lo traduce en el servidor.
export function rutaIntl(mercado: CodigoMercado, slug?: string): string {
  const partes = [mercado === "global" ? "" : mercado, slug ?? ""].filter(Boolean);
  return `/${partes.join("/")}`;
}

export function urlIntl(mercado: CodigoMercado, slug?: string): string {
  const ruta = rutaIntl(mercado, slug);
  return `${origenPublicoIntl()}${ruta === "/" ? "/" : ruta}`;
}

// La imagen OG vive en /<m>/og/<slug>, que ya cubre el rewrite de cada mercado. La de global va en
// /og/<slug> y necesita que hosts.ts mande /og/* del host intl a /intl/global/og/* (hoy lo manda al
// 404 para tapar el /og de calcular.ar). `v` cambia cuando cambia el dato y obliga a WhatsApp y a
// las redes a pedir la imagen nueva en vez de mostrar la que tienen guardada.
export function urlImagenOg(mercado: CodigoMercado, slug?: string, version?: FechaISO): string {
  const base = mercado === "global" ? "/og" : `/${mercado}/og`;
  const v = version ? `?v=${version.replace(/-/g, "")}` : "";
  return `${origenPublicoIntl()}${base}${slug ? `/${slug}` : ""}${v}`;
}

// og:locale usa guion bajo y región de dos letras. es-419 (Latinoamérica) no tiene una: Facebook
// usa es_LA para ese caso.
export function ogLocale(locale: string): string {
  const [idioma, region] = locale.split("-");
  if (!region) return idioma;
  return /^\d+$/.test(region) ? `${idioma}_LA` : `${idioma}_${region.toUpperCase()}`;
}

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// El primero que entra en LARGO_TITULO. Si ninguno entra va el más corto: cortarlo a mano deja
// títulos rotos a la mitad de una palabra, y eso lo marca el check, no esta función.
export function elegirTitulo(candidatos: readonly string[]): string {
  const limpios = candidatos.map((c) => c.trim()).filter(Boolean);
  return limpios.find((c) => c.length <= LARGO_TITULO) ?? [...limpios].sort((a, b) => a.length - b.length)[0] ?? "";
}

// El dominio es .com y compite con sitios de cada país: el nombre del país en el título es lo que
// lo ata a la búsqueda local ("aguinaldo méxico"). Se suma solo si falta y si entra; la marca no se
// suma (Google la pone arriba del resultado a partir del WebSite del JSON-LD, como en calcular.ar).
export function tituloConPais(titulo: string, mercado: Pick<Mercado, "codigo" | "nombre">): string {
  if (mercado.codigo === "global" || sinTildes(titulo).includes(sinTildes(mercado.nombre))) return elegirTitulo([titulo]);
  return elegirTitulo([`${titulo} | ${mercado.nombre}`, titulo]);
}

export type Idiomas = Record<string, string>;

// Clúster por concepto (ADR 0001, D6): cada página lista a todas sus equivalentes publicadas,
// incluida ella misma, más x-default. Si hay una sola (ella misma), no hay clúster: no se emite.
export function hreflangDe(concepto: string, equivalentes: readonly Equivalente[]): Idiomas | undefined {
  if (concepto === "propio" || !esConcepto(concepto)) return undefined;
  const idiomas: Idiomas = {};
  for (const e of equivalentes) idiomas[e.locale] = urlIntl(e.mercado, e.slug);
  const rutaAR = (CONCEPTOS[concepto] as { rutaAR?: string }).rutaAR;
  if (hreflangARActivo() && rutaAR) idiomas["es-AR"] = `${origenAR()}${rutaAR}`;
  if (Object.keys(idiomas).length < 2) return undefined;
  idiomas["x-default"] = urlIntl("global");
  return idiomas;
}

// Lo que tendrían que llevar las páginas de calcular.ar del clúster cuando Manuel lo apruebe
// (plan 1.8). Con el flag apagado devuelve undefined y AR no cambia ni un byte.
export function hreflangParaAR(concepto: string, equivalentes: readonly Equivalente[]): Idiomas | undefined {
  if (!hreflangARActivo()) return undefined;
  return hreflangDe(concepto, equivalentes);
}

export interface ImagenSeo {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: string;
}

export interface MetadataSeo {
  title: { absolute: string };
  description: string;
  alternates: { canonical: string; languages?: Idiomas };
  openGraph: {
    type: "website";
    siteName: string;
    locale: string;
    url: string;
    title: string;
    description: string;
    images: ImagenSeo[];
  };
  twitter: { card: "summary_large_image" };
}

// Todo junto y por página: Next mezcla la metadata por clave y en forma plana, así que un
// openGraph de la página que no repita site_name, locale y url los pierde (pasó en calcular.ar,
// ver openGraphDe en src/lib/seo.ts). `absolute` para que ningún template de un layout lo toque.
// Sin og:locale:alternate: en un clúster de 15 países eran 15 metas por página que solo lee Facebook.
export function metadataDe(p: { mercado: Mercado; slug?: string; title: string; description: string; idiomas?: Idiomas; imagen: { url: string; alt: string } }): MetadataSeo {
  const url = urlIntl(p.mercado.codigo, p.slug);
  const imagen: ImagenSeo = { url: p.imagen.url, width: 1200, height: 630, alt: p.imagen.alt, type: "image/png" };
  return {
    title: { absolute: p.title },
    description: p.description,
    alternates: { canonical: url, ...(p.idiomas ? { languages: p.idiomas } : {}) },
    openGraph: {
      type: "website",
      siteName: NOMBRE_SITIO_INTL,
      locale: ogLocale(p.mercado.locale),
      url,
      title: p.title,
      description: p.description,
      images: [imagen],
    },
    // X toma título, descripción e imagen de og:* cuando faltan los suyos: repetirlos solo suma bytes.
    twitter: { card: "summary_large_image" },
  };
}

type Ld = Record<string, unknown>;

export const idSitio = () => `${origenPublicoIntl()}/#sitio`;
export const idOrganizacion = () => `${origenPublicoIntl()}/#organizacion`;

// Un solo bloque por página con @graph y @id: así el validador ve un grafo y no nodos sueltos que
// repiten la organización en cada script.
export function grafo(nodos: readonly (Ld | null | undefined)[]): Ld {
  return { "@context": "https://schema.org", "@graph": nodos.filter((n): n is Ld => Boolean(n)) };
}

// Sin SearchAction: el sitio no tiene buscador y Google la ignora (o la marca) si no lleva a uno.
export function ldSitio(): Ld[] {
  const origen = origenPublicoIntl();
  return [
    {
      "@type": "WebSite",
      "@id": idSitio(),
      url: `${origen}/`,
      name: NOMBRE_SITIO_INTL,
      alternateName: "Calcular Ya",
      inLanguage: "es",
      publisher: { "@id": idOrganizacion() },
    },
    {
      "@type": "Organization",
      "@id": idOrganizacion(),
      name: NOMBRE_SITIO_INTL,
      url: `${origen}/`,
      logo: { "@type": "ImageObject", url: `${origen}/og/marca`, width: 512, height: 512 },
      founder: { "@type": "Person", name: "Manuel Navarro" },
      sameAs: [origenAR()],
    },
  ];
}

function areaServida(mercado: Mercado): Ld | undefined {
  if (mercado.codigo === "global" || !mercado.pais) return undefined;
  return { "@type": "Country", name: mercado.nombre, identifier: mercado.pais };
}

export function ldWebApplication(p: { nombre: string; descripcion: string; url: string; mercado: Mercado; actualizado?: FechaISO; imagen?: string }): Ld {
  const area = areaServida(p.mercado);
  return {
    "@type": "WebApplication",
    "@id": `${p.url}#calculadora`,
    name: p.nombre,
    description: p.descripcion,
    url: p.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    inLanguage: p.mercado.locale,
    ...(area ? { areaServed: area } : {}),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: p.mercado.monedas[0] },
    ...(p.actualizado ? { dateModified: p.actualizado } : {}),
    ...(p.imagen ? { image: p.imagen } : {}),
    isPartOf: { "@id": idSitio() },
    publisher: { "@id": idOrganizacion() },
  };
}

export function ldPagina(p: {
  tipo?: "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage";
  url: string;
  nombre: string;
  descripcion: string;
  locale: string;
  actualizado?: FechaISO;
  imagen?: string;
  migas?: boolean;
  principal?: Ld;
}): Ld {
  return {
    "@type": p.tipo ?? "WebPage",
    "@id": p.url,
    url: p.url,
    name: p.nombre,
    description: p.descripcion,
    inLanguage: p.locale,
    isPartOf: { "@id": idSitio() },
    ...(p.actualizado ? { dateModified: p.actualizado } : {}),
    ...(p.imagen ? { primaryImageOfPage: { "@type": "ImageObject", url: p.imagen, width: 1200, height: 630 } } : {}),
    ...(p.migas ? { breadcrumb: { "@id": `${p.url}#migas` } } : {}),
    ...(p.principal ? { mainEntity: p.principal } : {}),
  };
}

export function ldLista(items: readonly { nombre: string; url: string }[]): Ld {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.nombre, url: it.url })),
  };
}

export function ldFaq(faq: readonly PreguntaFrecuente[], url: string): Ld | null {
  if (!faq.length) return null;
  return {
    "@type": "FAQPage",
    "@id": `${url}#preguntas`,
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })),
  };
}

// El @id cuelga de la última miga, que es la página donde está.
export function ldMigas(items: readonly { nombre: string; url: string }[]): Ld {
  return {
    "@type": "BreadcrumbList",
    "@id": `${items.at(-1)?.url ?? origenPublicoIntl()}#migas`,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.nombre, item: it.url })),
  };
}

// Dentro de <script type="application/ld+json"> un "</script>" en un texto cerraría la etiqueta.
export function serializarLd(datos: Ld | readonly Ld[]): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}
