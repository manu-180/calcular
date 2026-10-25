import type { Idioma, Trato } from "../../tipos";
import { adaptar, ajusteDeLocale, fusionar, parcheDe, regionalesDe } from "../resolver";
import { ar } from "./ar";
import { de } from "./de";
import { en } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { id } from "./id";
import { it } from "./it";
import { ja } from "./ja";
import { ko } from "./ko";
import { nl } from "./nl";
import { sv } from "./sv";
import { da } from "./da";
import { fi } from "./fi";
import { nb } from "./nb";
import { pl } from "./pl";
import { pt } from "./pt";
import { tr } from "./tr";
import type { DatosLegales, DiccionarioLegal, PaginasLegales } from "./tipos";
import { zh } from "./zh";

export type { BloqueLegal, DatosLegales, PaginaLegal, PaginasLegales } from "./tipos";

export const DICCIONARIOS_LEGALES: Readonly<Record<Idioma, DiccionarioLegal>> = { es, pt, en, fr, de, it, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id, tr };

export function resolverLegales(idioma: Idioma, trato: Trato, datos: DatosLegales, locale?: string): PaginasLegales {
  const dic = DICCIONARIOS_LEGALES[idioma](datos);
  let paginas = fusionar<PaginasLegales>(dic.base, parcheDe(dic, idioma, trato));
  for (const regional of regionalesDe(dic, locale)) paginas = fusionar<PaginasLegales>(paginas, regional);
  const ajuste = ajusteDeLocale(locale);
  return ajuste ? adaptar(paginas, ajuste) : paginas;
}
