import type { ModoPublicacion, Registro } from "./registro";
import type { Idiomas } from "./seo";
import type { Idioma, Mercado } from "./tipos";

// Rankings, «horas de trabajo» y «tu sueldo en el mundo» muestran la misma tabla de países en todas las
// ediciones: solo cambian el idioma, la moneda y qué país va resaltado. Indexarlas en las 142 ediciones
// eran 1.136 URLs casi iguales (docs/decisiones/desindexacion-2026-11.md). Se indexa una por idioma, la
// edición de referencia; las demás siguen vivas y enlazadas con noindex, follow, fuera del sitemap y del
// clúster. global es la de su idioma (inglés) y el x-default.
//
// La preferida de cada idioma con varias ediciones es su país con más hablantes conectados. Si no está
// publicada vale la primera edición de ese idioma en el registro: un idioma nuevo no necesita tocar esto.
const PREFERIDA: Partial<Record<Idioma, string>> = {
  es: "mx",
  pt: "br",
  fr: "fr",
  de: "de",
  it: "it",
  nl: "nl",
  ar: "eg",
  ru: "kz",
  ro: "ro",
  el: "gr",
  sr: "rs",
};

const memo = new WeakMap<Registro, Map<ModoPublicacion, Mercado[]>>();

export function edicionesDeReferencia(registro: Registro, modo: ModoPublicacion): Mercado[] {
  const guardado = memo.get(registro)?.get(modo);
  if (guardado) return guardado;
  const mercados = registro.mercados(modo);
  const porIdioma = new Map<Idioma, Mercado>();
  const global = mercados.find((m) => m.codigo === "global");
  if (global) porIdioma.set(global.idioma, global);
  for (const m of mercados) {
    const actual = porIdioma.get(m.idioma);
    if (!actual || (actual.codigo !== "global" && PREFERIDA[m.idioma] === m.codigo)) porIdioma.set(m.idioma, m);
  }
  const lista = [...porIdioma.values()];
  memo.set(registro, (memo.get(registro) ?? new Map<ModoPublicacion, Mercado[]>()).set(modo, lista));
  return lista;
}

export function esDeReferencia(registro: Registro, m: Pick<Mercado, "codigo">, modo: ModoPublicacion): boolean {
  return edicionesDeReferencia(registro, modo).some((x) => x.codigo === m.codigo);
}

// El clúster de una de esas páginas: una entrada por idioma (la etiqueta es el idioma solo, «es», porque
// la página vale para todos los países que lo hablan) y x-default en global. Una edición que no es de
// referencia no tiene clúster.
export function clusterDeReferencia(registro: Registro, modo: ModoPublicacion, url: (m: Mercado) => string, extra: Idiomas = {}): Idiomas | undefined {
  const idiomas: Idiomas = {};
  const ediciones = edicionesDeReferencia(registro, modo);
  for (const m of ediciones) idiomas[m.idioma] = url(m);
  Object.assign(idiomas, extra);
  if (Object.keys(idiomas).length < 2) return undefined;
  const global = ediciones.find((m) => m.codigo === "global");
  if (global) idiomas["x-default"] = url(global);
  return idiomas;
}
