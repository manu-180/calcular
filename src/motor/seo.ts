import { anchoVisual } from "./ancho";
import { CONCEPTOS, esConcepto } from "./conceptos";
import type { Equivalente } from "./registro";
import { hreflangARActivo, NOMBRE_SITIO_INTL, origenAR, origenIntl } from "./sitio";
import type { CodigoMercado, FechaISO, Mercado, PreguntaFrecuente } from "./tipos";
import { etiquetaIdioma } from "./i18n/direccion";

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
// usa es_LA para ese caso. La escritura (sr-Latn-RS) no va en og:locale: queda sr_RS.
export function ogLocale(locale: string): string {
  const [idioma, region] = etiquetaIdioma(locale).split("-").filter((p, i) => i === 0 || !/^[A-Za-z]{4}$/.test(p));
  if (!region) return idioma;
  return /^\d+$/.test(region) ? `${idioma}_LA` : `${idioma}_${region.toUpperCase()}`;
}

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// El primero que entra en LARGO_TITULO. Si ninguno entra va el más corto: cortarlo a mano deja
// títulos rotos a la mitad de una palabra, y eso lo marca el check, no esta función.
export function elegirTitulo(candidatos: readonly string[]): string {
  const limpios = candidatos.map((c) => c.trim()).filter(Boolean);
  return limpios.find((c) => anchoVisual(c) <= LARGO_TITULO) ?? [...limpios].sort((a, b) => anchoVisual(a) - anchoVisual(b))[0] ?? "";
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
// Una calculadora "propio" solo tiene clúster con sus traducciones en las ediciones del país
// (registro.pagina() las pone en equivalentes).
export function hreflangDe(concepto: string, equivalentes: readonly Equivalente[]): Idiomas | undefined {
  if (!esConcepto(concepto)) return undefined;
  const idiomas: Idiomas = {};
  for (const e of equivalentes) idiomas[etiquetaIdioma(e.locale)] = urlIntl(e.mercado, e.slug);
  const rutaAR = concepto === "propio" ? undefined : (CONCEPTOS[concepto] as { rutaAR?: string }).rutaAR;
  if (hreflangARActivo() && rutaAR) idiomas["es-AR"] = `${origenAR()}${rutaAR}`;
  if (Object.keys(idiomas).length < 2) return undefined;
  idiomas["x-default"] = urlIntl("global");
  return idiomas;
}

// Más de 20 alternativos no van en el <head>: con una universal en 190 países eran ~35 KB por página
// (cada link viaja en el HTML y en el payload RSC). Ese clúster va en el sitemap de cada mercado
// (xhtml:link), que Google acepta igual que el <head>; se usa uno de los dos, nunca los dos a medias.
export const MAX_HREFLANG_HEAD = 20;

export function hreflangVaAlSitemap(idiomas: Idiomas | undefined): boolean {
  return idiomas !== undefined && Object.keys(idiomas).filter((k) => k !== "x-default").length > MAX_HREFLANG_HEAD;
}

export function hreflangDelHead(concepto: string, equivalentes: readonly Equivalente[]): Idiomas | undefined {
  const idiomas = hreflangDe(concepto, equivalentes);
  return hreflangVaAlSitemap(idiomas) ? undefined : idiomas;
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
}

// Las mismas medidas que devuelve la ruta og/[[...slug]] (ImageResponse 1200 x 630).
const MEDIDAS_OG = { width: 1200, height: 630 } as const;

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
  robots?: { index: false; follow: true };
}

// Todo junto y por página: Next mezcla la metadata por clave y en forma plana, así que un
// openGraph de la página que no repita site_name, locale y url los pierde (pasó en calcular.ar,
// ver openGraphDe en src/lib/seo.ts). `absolute` para que ningún template de un layout lo toque.
// Cada meta del <head> viaja dos veces (en el HTML y en el payload RSC) y las calculadoras ya pasan
// los 130 KB: sin og:locale:alternate (15 metas por clúster que solo lee Facebook) ni og:image:alt
// ni :type (el alt repetía el título). :width y :height sí van: sin ellas las redes bajan la imagen
// para medirla antes de mostrar la tarjeta.
export function metadataDe(p: { mercado: Mercado; slug?: string; title: string; description: string; idiomas?: Idiomas; imagen: string; noindex?: boolean }): MetadataSeo {
  const url = urlIntl(p.mercado.codigo, p.slug);
  const imagen: ImagenSeo = { url: p.imagen, ...MEDIDAS_OG };
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
    ...(p.noindex ? { robots: { index: false, follow: true } as const } : {}),
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
// Va solo en la home global: Google lee el nombre del sitio y la organización de la home, y en el
// resto de las páginas eran 600 bytes por dos (HTML y payload RSC) sin uso.
export function ldSitio(): Ld[] {
  const origen = origenPublicoIntl();
  return [
    {
      "@type": "WebSite",
      "@id": idSitio(),
      url: `${origen}/`,
      name: NOMBRE_SITIO_INTL,
      alternateName: "Calcular Ya",
      // La home global está en inglés (ADR 0002, D2); cada edición declara el suyo en su WebPage.
      inLanguage: "en",
      publisher: { "@id": idOrganizacion() },
    },
    {
      "@type": "Organization",
      "@id": idOrganizacion(),
      name: NOMBRE_SITIO_INTL,
      url: `${origen}/`,
      logo: { "@type": "ImageObject", url: `${origen}/og/marca`, width: 512, height: 512 },
      founder: ldPersona(),
      sameAs: [origenAR()],
    },
  ];
}

// La persona que responde por los números, con nombre y url (Google no resuelve un @id contra otra
// página). La misma entidad que firma calcular.ar (src/lib/schema.ts, AUTOR): sameAs las une.
export function ldPersona(): Ld {
  return { "@type": "Person", name: "Manuel Navarro", url: `${origenPublicoIntl()}/sobre`, sameAs: [`${origenAR()}/sobre`] };
}

function areaServida(mercado: Mercado): Ld | undefined {
  if (mercado.codigo === "global" || !mercado.pais) return undefined;
  return { "@type": "Country", name: mercado.nombre, identifier: mercado.pais };
}

// Google no resuelve un @id contra otra URL del sitio (ver src/lib/seo.ts): la organización va
// con nombre y url, no como referencia a la de la home.
const editor = () => ({ "@type": "Organization", name: NOMBRE_SITIO_INTL, url: `${origenPublicoIntl()}/` });

// Sin description ni publisher: la description es la del <meta> (Google la toma de ahí) y en una
// calculadora cada byte de JSON-LD va dos veces (HTML y payload RSC).
export function ldWebApplication(p: { nombre: string; url: string; mercado: Mercado; actualizado?: FechaISO; imagen?: string }): Ld {
  const area = areaServida(p.mercado);
  return {
    "@type": "WebApplication",
    name: p.nombre,
    url: p.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: etiquetaIdioma(p.mercado.locale),
    ...(area ? { areaServed: area } : {}),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: p.mercado.monedas[0] },
    ...(p.actualizado ? { dateModified: p.actualizado } : {}),
    ...(p.imagen ? { image: p.imagen } : {}),
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
  principal?: Ld;
}): Ld {
  return {
    "@type": p.tipo ?? "WebPage",
    url: p.url,
    name: p.nombre,
    description: p.descripcion,
    inLanguage: etiquetaIdioma(p.locale),
    ...(p.actualizado ? { dateModified: p.actualizado } : {}),
    ...(p.imagen ? { image: p.imagen } : {}),
    publisher: editor(),
    ...(p.principal ? { mainEntity: p.principal } : {}),
  };
}

export function ldLista(items: readonly { nombre?: string; url: string }[]): Ld {
  return {
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, ...(it.nombre ? { name: it.nombre } : {}), url: it.url })),
  };
}

export function ldFaq(faq: readonly PreguntaFrecuente[]): Ld | null {
  if (!faq.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })),
  };
}

export function ldMigas(items: readonly { nombre: string; url: string }[]): Ld {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.nombre, item: it.url })),
  };
}

// Dentro de <script type="application/ld+json"> un "</script>" en un texto cerraría la etiqueta.
export function serializarLd(datos: Ld | readonly Ld[]): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}
