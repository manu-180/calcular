import type { Idioma } from "../tipos";

// Slug del índice de rankings por idioma. Cada uno es una carpeta en src/app/(intl)/intl/[mercado]/
// y tiene que ser distinto de los demás (dos idiomas no pueden compartir carpeta) y de cualquier slug
// de calculadora: una carpeta estática le gana a [slug]. Es el mismo en todas las ediciones de un
// idioma, así el clúster hreflang se arma solo para un país nuevo.
export const SLUG_RANKINGS: Record<Idioma, string> = {
  es: "ranking-de-paises",
  pt: "ranking-dos-paises",
  en: "country-rankings",
  fr: "classement-des-pays",
  de: "laender-ranking",
  it: "classifica-dei-paesi",
  nl: "landenranglijst",
  ja: "kunibetsu-ranking",
  ko: "gukgabyeol-sunwi",
  zh: "guojia-paiming",
  sr: "rang-lista-zemalja",
};

export const IDS_RANKING = ["rinde", "libertad", "aumento"] as const;
export type IdRanking = (typeof IDS_RANKING)[number];

// Slug de cada ranking dentro del índice (/<m>/<índice>/<ranking>). ja, ko y zh van con el slug en
// inglés, como las universales (ADR 0002, D8). Ninguno puede ser «og»: esa carpeta es la imagen.
export const SLUGS_RANKING: Record<Idioma, Record<IdRanking, string>> = {
  es: { rinde: "donde-rinde-mas-el-sueldo", libertad: "dia-de-libertad-tributaria", aumento: "cuanto-queda-de-un-aumento" },
  pt: { rinde: "onde-o-salario-rende-mais", libertad: "dia-da-liberdade-de-impostos", aumento: "quanto-fica-de-um-aumento" },
  en: { rinde: "where-pay-goes-furthest", libertad: "tax-freedom-day-by-country", aumento: "how-much-of-a-raise-you-keep" },
  fr: { rinde: "ou-le-salaire-rapporte-le-plus", libertad: "jour-de-liberation-fiscale", aumento: "ce-qui-reste-d-une-augmentation" },
  de: { rinde: "wo-das-gehalt-am-meisten-bringt", libertad: "steuerzahlergedenktag", aumento: "was-von-der-gehaltserhoehung-bleibt" },
  it: { rinde: "dove-rende-di-piu-lo-stipendio", libertad: "giorno-di-liberazione-fiscale", aumento: "quanto-resta-di-un-aumento" },
  nl: { rinde: "waar-salaris-het-meest-oplevert", libertad: "belastingvrijheidsdag", aumento: "wat-overblijft-van-loonsverhoging" },
  ja: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  ko: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  zh: { rinde: "take-home-pay", libertad: "tax-freedom-day", aumento: "pay-raise" },
  // sr en ASCII sin diacríticos, con las palabras que se buscan (ADR 0002, D23).
  sr: { rinde: "gde-plata-vredi-najvise", libertad: "dan-poreske-slobode", aumento: "koliko-ostaje-od-povisice" },
};

export function rankingDeSlug(idioma: Idioma, slug: string): IdRanking | null {
  const tabla = SLUGS_RANKING[idioma];
  return IDS_RANKING.find((id) => tabla[id] === slug) ?? null;
}

export function slugRanking(idioma: Idioma, id: IdRanking): string {
  return `${SLUG_RANKINGS[idioma]}/${SLUGS_RANKING[idioma][id]}`;
}

// Datos abiertos: un solo juego de archivos para todo el sitio, servido por la edición global
// (src/app/(intl)/intl/[mercado]/data). hosts.ts manda /data/<archivo> del host intl a global.
export const SEGMENTO_DATOS = "data";
export const ARCHIVOS_DATOS = { json: "country-rankings.json", csv: "country-rankings.csv" } as const;

export function rutaDatos(formato: keyof typeof ARCHIVOS_DATOS): string {
  return `/${SEGMENTO_DATOS}/${ARCHIVOS_DATOS[formato]}`;
}
