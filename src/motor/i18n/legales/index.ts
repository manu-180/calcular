import type { Idioma, Trato } from "../../tipos";
import { adaptar, ajusteDeLocale, fusionar, parcheDe } from "../resolver";
import { bn } from "./bn";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { nl } from "./nl";
import { pt } from "./pt";
import type { DatosLegales, DiccionarioLegal, PaginasLegales } from "./tipos";
import { zh } from "./zh";

export type { BloqueLegal, DatosLegales, PaginaLegal, PaginasLegales } from "./tipos";

export const DICCIONARIOS_LEGALES: Readonly<Record<Idioma, DiccionarioLegal>> = { es, pt, en, fr, de, it, nl, ja, ko, zh, bn };

export function resolverLegales(idioma: Idioma, trato: Trato, datos: DatosLegales, locale?: string): PaginasLegales {
  const dic = DICCIONARIOS_LEGALES[idioma](datos);
  let paginas = fusionar<PaginasLegales>(dic.base, parcheDe(dic, idioma, trato));
  const regional = locale ? dic.regional?.[locale] : undefined;
  if (regional) paginas = fusionar<PaginasLegales>(paginas, regional);
  const ajuste = ajusteDeLocale(locale);
  return ajuste ? adaptar(paginas, ajuste) : paginas;
}
