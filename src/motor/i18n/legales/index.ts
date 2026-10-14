import type { Idioma, Trato } from "../../tipos";
import { fusionar, parcheDe } from "../resolver";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { nl } from "./nl";
import { pt } from "./pt";
import type { DatosLegales, DiccionarioLegal, PaginasLegales } from "./tipos";

export type { BloqueLegal, DatosLegales, PaginaLegal, PaginasLegales } from "./tipos";

export const DICCIONARIOS_LEGALES: Readonly<Record<Idioma, DiccionarioLegal>> = { es, pt, en, fr, de, it, nl };

export function resolverLegales(idioma: Idioma, trato: Trato, datos: DatosLegales): PaginasLegales {
  const dic = DICCIONARIOS_LEGALES[idioma](datos);
  return fusionar<PaginasLegales>(dic.base, parcheDe(dic, idioma, trato));
}
