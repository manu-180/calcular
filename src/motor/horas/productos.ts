import type { Idioma } from "../tipos";

// Productos del índice «¿Cuántas horas de trabajo cuesta?». Cada uno es el mismo en todo el mundo y
// tiene precio público del fabricante por país. Solo se lee la tienda oficial: un precio de revendedor
// nunca entra (scripts/horas/actualizar_precios.ts).
//
// Descartados (2026-10-23): Netflix (su robots.txt prohíbe todo a cualquier bot que no sea de un buscador
// o asistente), PlayStation 5 (cada país vende en una tienda distinta, sin un formato común) y Nintendo
// Switch (sin tienda oficial en la mayoría de los países del registro).

export type TiendaHoras = "apple" | "spotify";

export interface ProductoHoras {
  id: string;
  tienda: TiendaHoras;
  nombre: string;
  // Apple: ruta dentro de la tienda del país y nombre exacto del Product en el JSON-LD de la página.
  ruta?: string;
  nombreLd?: string;
  // «mes»: suscripción, el precio es por un mes. «unico»: se compra una vez.
  periodo: "unico" | "mes";
  // Precio razonable en dólares internacionales (precio local ÷ PPA). Fuera de este rango el precio se
  // descarta: casi siempre es un número mal leído (separador de miles, otra moneda).
  rangoPpa: readonly [number, number];
  // Con artículo, para frases del tipo «cuesta un iPhone 17». En es-ES el MacBook es masculino.
  conArticulo: Readonly<Record<Idioma, string>>;
  conArticuloRegional?: Readonly<Record<string, string>>;
}

export const PRODUCTOS: readonly ProductoHoras[] = [
  {
    id: "iphone-17",
    tienda: "apple",
    nombre: "iPhone 17",
    ruta: "shop/buy-iphone/iphone-17",
    nombreLd: "iPhone 17",
    periodo: "unico",
    rangoPpa: [300, 6000],
    conArticulo: { es: "un iPhone 17", pt: "um iPhone 17", en: "an iPhone 17", fr: "un iPhone 17", de: "ein iPhone 17", it: "un iPhone 17", nl: "een iPhone 17", ja: "iPhone 17", ko: "아이폰 17", zh: "iPhone 17", uz: "iPhone 17" },
  },
  {
    id: "iphone-18-pro",
    tienda: "apple",
    nombre: "iPhone 18 Pro",
    ruta: "shop/buy-iphone/iphone-18-pro",
    nombreLd: "iPhone 18 Pro",
    periodo: "unico",
    rangoPpa: [400, 8000],
    conArticulo: { es: "un iPhone 18 Pro", pt: "um iPhone 18 Pro", en: "an iPhone 18 Pro", fr: "un iPhone 18 Pro", de: "ein iPhone 18 Pro", it: "un iPhone 18 Pro", nl: "een iPhone 18 Pro", ja: "iPhone 18 Pro", ko: "아이폰 18 Pro", zh: "iPhone 18 Pro", uz: "iPhone 18 Pro" },
  },
  {
    id: "macbook-air",
    tienda: "apple",
    nombre: "MacBook Air",
    ruta: "shop/buy-mac/macbook-air",
    nombreLd: "MacBook Air",
    periodo: "unico",
    rangoPpa: [400, 8000],
    conArticulo: { es: "una MacBook Air", pt: "um MacBook Air", en: "a MacBook Air", fr: "un MacBook Air", de: "ein MacBook Air", it: "un MacBook Air", nl: "een MacBook Air", ja: "MacBook Air", ko: "맥북 에어", zh: "MacBook Air", uz: "MacBook Air" },
    conArticuloRegional: { "es-ES": "un MacBook Air" },
  },
  {
    id: "spotify-premium",
    tienda: "spotify",
    nombre: "Spotify Premium",
    periodo: "mes",
    rangoPpa: [1, 40],
    conArticulo: { es: "Spotify Premium", pt: "o Spotify Premium", en: "Spotify Premium", fr: "Spotify Premium", de: "Spotify Premium", it: "Spotify Premium", nl: "Spotify Premium", ja: "Spotify Premium", ko: "스포티파이 프리미엄", zh: "Spotify Premium", uz: "Spotify Premium" },
  },
];

export const PRODUCTO_INICIAL = PRODUCTOS[0].id;

export function productoDe(id: string): ProductoHoras | undefined {
  return PRODUCTOS.find((p) => p.id === id);
}

export function conArticulo(p: ProductoHoras, idioma: Idioma, locale: string): string {
  return p.conArticuloRegional?.[locale] ?? p.conArticulo[idioma];
}

// Segmento de cada país en la tienda. Apple usa «uk» para el Reino Unido y la raíz para Estados Unidos;
// Bélgica y Suiza tienen una tienda por idioma con el mismo precio. Un país sin tienda da 404.
const APPLE_SEGMENTO: Readonly<Record<string, string>> = { US: "", GB: "uk", BE: "be-fr", CH: "ch-de" };
const SPOTIFY_SEGMENTO: Readonly<Record<string, string>> = { GB: "uk" };

export function segmentoTienda(tienda: TiendaHoras, iso: string): string {
  const t = tienda === "apple" ? APPLE_SEGMENTO : SPOTIFY_SEGMENTO;
  return iso in t ? t[iso] : iso.toLowerCase();
}

export function urlProducto(p: ProductoHoras, iso: string): string {
  const seg = segmentoTienda(p.tienda, iso);
  if (p.tienda === "apple") return `https://www.apple.com/${seg ? `${seg}/` : ""}${p.ruta}`;
  return `https://www.spotify.com/${seg}/premium/`;
}

export const NOMBRE_TIENDA: Readonly<Record<TiendaHoras, string>> = { apple: "Apple Store", spotify: "Spotify" };
