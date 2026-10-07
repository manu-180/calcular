import { CONCEPTOS, esConcepto } from "./conceptos";
import type { Equivalente } from "./registro";
import { hreflangARActivo, NOMBRE_SITIO_INTL, origenAR, origenIntl } from "./sitio";
import type { CodigoMercado, Mercado, PreguntaFrecuente } from "./tipos";

// Sin la variable el árbol intl no se genera, así que este valor solo se usa en checks y tipos.
const ORIGEN_POR_DEFECTO = "https://calcularya.com";

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

// og:locale usa guion bajo y región de dos letras. es-419 (Latinoamérica) no tiene una: Facebook
// usa es_LA para ese caso.
export function ogLocale(locale: string): string {
  const [idioma, region] = locale.split("-");
  if (!region) return idioma;
  return /^\d+$/.test(region) ? `${idioma}_LA` : `${idioma}_${region.toUpperCase()}`;
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

export interface MetadataSeo {
  title: string;
  description: string;
  alternates: { canonical: string; languages?: Idiomas };
  openGraph: { type: "website"; siteName: string; locale: string; url: string; title: string; description: string };
  robots?: { index: boolean; follow: boolean };
}

export function metadataDe(p: { mercado: Mercado; slug?: string; title: string; description: string; idiomas?: Idiomas }): MetadataSeo {
  const url = urlIntl(p.mercado.codigo, p.slug);
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url, ...(p.idiomas ? { languages: p.idiomas } : {}) },
    openGraph: { type: "website", siteName: NOMBRE_SITIO_INTL, locale: ogLocale(p.mercado.locale), url, title: p.title, description: p.description },
  };
}

type Ld = Record<string, unknown>;

export function ldOrganizacion(): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origenPublicoIntl()}/#organizacion`,
    name: NOMBRE_SITIO_INTL,
    url: `${origenPublicoIntl()}/`,
    sameAs: [origenAR()],
  };
}

export function ldWebApplication(p: { nombre: string; descripcion: string; url: string; mercado: Mercado }): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: p.nombre,
    description: p.descripcion,
    url: p.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: p.mercado.locale,
    ...(p.mercado.codigo !== "global" && p.mercado.pais ? { areaServed: { "@type": "Country", name: p.mercado.nombre, identifier: p.mercado.pais } } : {}),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: p.mercado.monedas[0] },
    publisher: { "@id": `${origenPublicoIntl()}/#organizacion` },
  };
}

export function ldFaq(faq: readonly PreguntaFrecuente[]): Ld | null {
  if (!faq.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })),
  };
}

export function ldMigas(items: readonly { nombre: string; url: string }[]): Ld {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.nombre, item: it.url })),
  };
}

// Dentro de <script type="application/ld+json"> un "</script>" en un texto cerraría la etiqueta.
export function serializarLd(datos: Ld | readonly Ld[]): string {
  return JSON.stringify(datos).replace(/</g, "\\u003c");
}
