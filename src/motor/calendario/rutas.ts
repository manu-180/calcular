import { etiquetaIdioma } from "../i18n/direccion";
import type { ModoPublicacion, Registro } from "../registro";
import { rutaIntl, urlIntl, type Idiomas } from "../seo";
import type { CodigoMercado, Idioma, Mercado } from "../tipos";
import { hoyEn } from "../vigencia";
import { calendarioDe, esPublicable } from "./eventos";

// Slug del calendario por idioma, igual en todas las ediciones de ese idioma (como SLUG_MUNDO). Cada
// carpeta de src/app/(intl)/intl/[mercado]/<slug> responde solo en las ediciones de su idioma.
// check_calendario falla si una calculadora de algún país usa uno de estos slugs.
export const SLUG_CALENDARIO: Record<Idioma, string> = {
  es: "calendario-laboral",
  pt: "calendario-trabalhista",
  en: "pay-calendar",
  fr: "calendrier-paie",
  de: "lohnkalender",
  it: "calendario-lavoro",
  nl: "loonkalender",
  ja: "kyuyo-karenda",
  ko: "geupyeo-dallyeok",
  zh: "gongzi-rili",
  ar: "taqwim-alrawatib",
};

export const ARCHIVO_ICS = "calendario.ics";

type M = Pick<Mercado, "codigo" | "idioma">;

export const rutaCalendario = (m: M) => rutaIntl(m.codigo, SLUG_CALENDARIO[m.idioma]);
export const urlCalendario = (m: M) => urlIntl(m.codigo, SLUG_CALENDARIO[m.idioma]);
export const urlIcs = (m: M) => `${urlCalendario(m)}/${ARCHIVO_ICS}`;
export const rutaIcsEvento = (m: M, id: string) => `${rutaCalendario(m)}/evento/${id}.ics`;
export const webcal = (url: string) => url.replace(/^https?:\/\//, "webcal://");

export function calendarioPublicado(registro: Registro, m: Mercado, modo: ModoPublicacion) {
  if (m.codigo === "global") return null;
  const c = calendarioDe(registro, m.codigo, hoyEn(m), modo);
  return esPublicable(c) ? c : null;
}

// Las ediciones del mismo país (ca y ca-fr) son el mismo calendario en otro idioma: forman su propio
// clúster, con x-default en la edición principal. Un país con una sola edición no lleva hreflang.
export function hreflangCalendario(registro: Registro, codigo: CodigoMercado, modo: ModoPublicacion): Idiomas | undefined {
  const ediciones = registro.ediciones(codigo, modo).filter((e) => calendarioPublicado(registro, e, modo));
  if (ediciones.length < 2) return undefined;
  const idiomas: Idiomas = {};
  for (const e of ediciones) idiomas[etiquetaIdioma(e.locale)] = urlCalendario(e);
  const principal = ediciones.find((e) => !e.codigo.includes("-")) ?? ediciones[0];
  idiomas["x-default"] = urlCalendario(principal);
  return idiomas;
}
