import type { Idioma } from "../tipos";
import { PRODUCTO_INICIAL, productoDe } from "./productos";

// Slug del índice por idioma: el mismo en todas las ediciones de un idioma, así el clúster hreflang se
// arma solo para cualquier país nuevo. Una carpeta por slug en src/app/(intl)/intl/[mercado]/.
export const SLUG_HORAS: Record<Idioma, string> = {
  es: "cuantas-horas-de-trabajo",
  pt: "quantas-horas-de-trabalho",
  en: "hours-of-work",
  fr: "heures-de-travail",
  de: "arbeitsstunden",
  it: "ore-di-lavoro",
  nl: "werkuren",
  ja: "rodo-jikan",
  ko: "nodong-sigan",
  zh: "gongzuo-shijian",
  bg: "kolko-chasa-rabota",
  lt: "kiek-valandu-dirbti",

  pl: "ile-godzin-pracy",
  sv: "arbetstimmar",
  da: "arbejdstimer",
  nb: "arbeidstimer",
  fi: "tyotunnit",
  ar: "saat-alamal",
  id: "berapa-jam-kerja",
  tr: "kac-saatlik-calisma",
  bn: "koto-ghonta-kaj",
  th: "chua-mong-tham-ngan",
  uk: "skilky-hodyn-roboty",
  uz: "necha-soatlik-mehnat",
  ru: "skolko-chasov-raboty",
  ro: "cate-ore-de-munca",
  cs: "kolik-hodin-prace",
  el: "poses-ores-douleias",
  hu: "hany-ora-munka",
  he: "kama-shaot-avoda",
  sr: "koliko-sati-rada",
};

export function rutaHoras(mercado: string, idioma: Idioma, producto?: string, iso?: string): string {
  return `/${mercado}/${SLUG_HORAS[idioma]}${producto ? `/${producto}` : ""}${producto && iso ? `/${iso.toLowerCase()}` : ""}`;
}

// /<m>/<slug>                 índice (producto inicial)
// /<m>/<slug>/<producto>      página del producto (indexable)
// /<m>/<slug>/<producto>/<iso> tarjeta de un país para compartir (no se indexa, canonical al producto)
export type RutaResuelta = { producto: string; pais: string | null; esIndice: boolean };

export function resolverRuta(partes: readonly string[] | undefined): RutaResuelta | null {
  if (!partes?.length) return { producto: PRODUCTO_INICIAL, pais: null, esIndice: true };
  if (partes.length > 2) return null;
  const [producto, pais] = partes;
  if (!productoDe(producto)) return null;
  if (pais === undefined) return { producto, pais: null, esIndice: false };
  return /^[a-z]{2}$/.test(pais) ? { producto, pais: pais.toUpperCase(), esIndice: false } : null;
}
