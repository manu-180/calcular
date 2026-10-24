import { de } from "../i18n/inicio/de";
import { en } from "../i18n/inicio/en";
import { es } from "../i18n/inicio/es";
import { fr } from "../i18n/inicio/fr";
import { it } from "../i18n/inicio/it";
import { ja } from "../i18n/inicio/ja";
import { ko } from "../i18n/inicio/ko";
import { nl } from "../i18n/inicio/nl";
import { pt } from "../i18n/inicio/pt";
import { ro } from "../i18n/inicio/ro";
import { zh } from "../i18n/inicio/zh";
import type { TextosInicio } from "../i18n/inicio/tipos";
import { resolver, type Diccionarios } from "../i18n/resolver";
import type { Idioma, Trato } from "../tipos";

export type { TextosInicio } from "../i18n/inicio/tipos";

export const DICCIONARIOS_INICIO: Diccionarios<TextosInicio> = { es, pt, en, fr, de, it, nl, ja, ko, zh, ro };

export function textosInicio(idioma: Idioma, trato: Trato, locale?: string): TextosInicio {
  return resolver(DICCIONARIOS_INICIO, idioma, trato, locale);
}
