import type { Metadata } from "next";
import { AUTOR, ORGANIZACION } from "@/lib/schema";
import { paginaDeRuta } from "@/data/navegacion";

export const SITIO = "https://calcular.ar";
export const NOMBRE_SITIO = "CalculAR";

const LOGO = `${SITIO}/apple-icon`;

type Nodo = Record<string, unknown>;

const MESES: Record<string, string> = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  setiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

const CAMPOS_FECHA = new Set(["dateModified", "datePublished", "dateCreated"]);

/** "6 de septiembre de 2026" -> "2026-09-06". Lo que ya es ISO o no se reconoce vuelve igual. */
export function fechaISO(valor: string): string {
  const m = valor.trim().match(/^(\d{1,2})[°º]?\s+de\s+([a-záéíóú]+)\s+de\s+(\d{4})$/i);
  if (!m) return valor;
  const mes = MESES[m[2].toLowerCase()];
  if (!mes) return valor;
  return `${m[3]}-${mes}-${m[1].padStart(2, "0")}`;
}

const AUTOR_PUBLICO = {
  "@type": AUTOR["@type"],
  "@id": AUTOR["@id"],
  name: AUTOR.name,
  url: AUTOR.url,
};

const ORG_PUBLICA = {
  "@type": ORGANIZACION["@type"],
  "@id": ORGANIZACION["@id"],
  name: ORGANIZACION.name,
  url: ORGANIZACION.url,
};

// Google no resuelve un {"@id"} contra otra URL del sitio: el Article que firma con
// {"@id": ".../#autor"} y no trae el nodo Person en la misma página queda con un autor sin
// nombre para el validador. Se completa acá, en la serialización, para no depender de que
// cada página arrastre AUTOR en su @graph.
function referenciaCompleta(nodo: Nodo): Nodo | null {
  const claves = Object.keys(nodo);
  if (claves.length !== 1 || claves[0] !== "@id") return null;
  if (nodo["@id"] === AUTOR["@id"]) return AUTOR_PUBLICO;
  if (nodo["@id"] === ORGANIZACION["@id"]) return ORG_PUBLICA;
  return null;
}

function normalizar(valor: unknown, clave?: string): unknown {
  if (Array.isArray(valor)) return valor.map((v) => normalizar(v));
  if (valor && typeof valor === "object") {
    const ref = referenciaCompleta(valor as Nodo);
    if (ref) return ref;
    const salida: Nodo = {};
    for (const [k, v] of Object.entries(valor as Nodo)) salida[k] = normalizar(v, k);
    return salida;
  }
  if (typeof valor === "string" && clave && CAMPOS_FECHA.has(clave)) return fechaISO(valor);
  return valor;
}

const NOMBRE_DE_TRAMO: Record<string, string> = {
  "/blog": "Guías",
  "/convenios": "Convenios",
  "/planillas": "Planillas",
  "/monotributo": "Monotributo",
  "/inflacion": "Inflación",
  "/aguinaldo": "Aguinaldo",
  "/sueldo-neto": "Sueldo neto",
  "/canasta-basica": "Canasta básica",
  "/cuota-alimentaria": "Cuota alimentaria",
};

function nombreDeTramo(ruta: string): string | undefined {
  return NOMBRE_DE_TRAMO[ruta] ?? paginaDeRuta(ruta)?.titulo;
}

/** Inicio > tramos intermedios que son páginas reales > la página. Solo con rutas del propio sitio. */
export function migas(ruta: string, nombreHoja: string): Nodo | null {
  const limpia = ruta.replace(/\/+$/, "");
  if (!limpia || limpia === "/") return null;
  const segmentos = limpia.split("/").filter(Boolean);
  const items: { name: string; item: string }[] = [{ name: "Inicio", item: SITIO }];
  for (let i = 1; i < segmentos.length; i++) {
    const tramo = "/" + segmentos.slice(0, i).join("/");
    const nombre = nombreDeTramo(tramo);
    if (nombre) items.push({ name: nombre, item: `${SITIO}${tramo}` });
  }
  items.push({ name: paginaDeRuta(limpia)?.titulo ?? nombreHoja, item: `${SITIO}${limpia}` });
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, ...it })),
  };
}

const TIPOS_PAGINA = ["WebApplication", "WebPage", "CollectionPage", "AboutPage", "Dataset", "Product"];

function tipos(n: Nodo): string[] {
  const t = n["@type"];
  return Array.isArray(t) ? (t as string[]) : typeof t === "string" ? [t] : [];
}

// La identidad de la página sale del Article (mainEntityOfPage es, por definición, esta URL); si no
// hay Article, del primer nodo de tipo página con url propia. Un Product o Dataset de otra ruta
// solo cuenta cuando no hay nada mejor, y la miga se arma igual sobre esa URL: por eso el check de
// SEO compara la última miga contra el canonical de cada página construida.
function urlDeLaPagina(grafo: Nodo[]): { url: string; nombre: string } | null {
  const enSitio = (u: unknown): u is string => typeof u === "string" && u.startsWith(SITIO);
  for (const n of grafo) {
    if (tipos(n).includes("Article") && enSitio(n.mainEntityOfPage)) {
      return { url: n.mainEntityOfPage, nombre: String(n.headline ?? "") };
    }
  }
  for (const tipo of TIPOS_PAGINA) {
    for (const n of grafo) {
      if (tipos(n).includes(tipo) && enSitio(n.url)) return { url: n.url, nombre: String(n.name ?? "") };
    }
  }
  return null;
}

/** Lo que efectivamente se serializa: fechas en ISO, referencias con nombre y migas si faltan. */
export function prepararJsonLd(data: object): object {
  const limpio = normalizar(data) as Nodo;
  const grafo = limpio["@graph"];
  if (!Array.isArray(grafo)) return limpio;
  const nodos = grafo as Nodo[];
  if (nodos.some((n) => tipos(n).includes("BreadcrumbList"))) return limpio;
  const pagina = urlDeLaPagina(nodos);
  if (!pagina) return limpio;
  const lista = migas(pagina.url.slice(SITIO.length) || "/", pagina.nombre);
  return lista ? { ...limpio, "@graph": [...nodos, lista] } : limpio;
}

/** Entidades del sitio que van en todas las páginas: quién publica, quién firma y qué sitio es. */
export function grafoDelSitio(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITIO}/#sitio`,
        url: SITIO,
        name: NOMBRE_SITIO,
        alternateName: ["calcular.ar", "Calcular AR"],
        inLanguage: "es-AR",
        publisher: { "@id": ORGANIZACION["@id"] },
      },
      {
        ...ORGANIZACION,
        logo: { "@type": "ImageObject", url: LOGO, width: 180, height: 180 },
        areaServed: { "@type": "Country", name: "Argentina" },
      },
      { ...AUTOR_PUBLICO, description: AUTOR.description, worksFor: { "@id": ORGANIZACION["@id"] } },
    ],
  };
}

/**
 * openGraph completo para una página. Hace falta porque Next mezcla la metadata en forma PLANA:
 * una página que declara `openGraph: { images }` pisa entero el openGraph del layout y pierde
 * og:site_name, og:locale, og:type y og:url (pasaba en 136 de 166 páginas el 6/10/2026).
 */
export function openGraphDe(opts: {
  ruta: string;
  titulo: string;
  bajada?: string;
  tipo?: "website" | "article";
}): NonNullable<Metadata["openGraph"]> {
  const t = encodeURIComponent(opts.titulo);
  const imagen = opts.bajada ? `/og?t=${t}&s=${encodeURIComponent(opts.bajada)}` : `/og?t=${t}`;
  return {
    type: opts.tipo ?? "website",
    siteName: NOMBRE_SITIO,
    locale: "es_AR",
    url: opts.ruta,
    images: [{ url: imagen, width: 1200, height: 630 }],
  };
}
