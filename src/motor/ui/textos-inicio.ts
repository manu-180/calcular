import { ar } from "../i18n/inicio/ar";
import { bn } from "../i18n/inicio/bn";
import { cs } from "../i18n/inicio/cs";
import { lv } from "../i18n/inicio/lv";
import { he } from "../i18n/inicio/he";
import { bg } from "../i18n/inicio/bg";
import { mn } from "../i18n/inicio/mn";
import { hy } from "../i18n/inicio/hy";
import { sq } from "../i18n/inicio/sq";
import { de } from "../i18n/inicio/de";
import { el } from "../i18n/inicio/el";
import { en } from "../i18n/inicio/en";
import { es } from "../i18n/inicio/es";
import { hu } from "../i18n/inicio/hu";
import { fr } from "../i18n/inicio/fr";
import { id } from "../i18n/inicio/id";
import { it } from "../i18n/inicio/it";
import { ja } from "../i18n/inicio/ja";
import { ka } from "../i18n/inicio/ka";
import { ko } from "../i18n/inicio/ko";
import { nl } from "../i18n/inicio/nl";
import { sv } from "../i18n/inicio/sv";
import { da } from "../i18n/inicio/da";
import { fi } from "../i18n/inicio/fi";
import { nb } from "../i18n/inicio/nb";
import { pl } from "../i18n/inicio/pl";
import { pt } from "../i18n/inicio/pt";
import { tr } from "../i18n/inicio/tr";
import { th } from "../i18n/inicio/th";
import { uk } from "../i18n/inicio/uk";
import { uz } from "../i18n/inicio/uz";
import { ru } from "../i18n/inicio/ru";
import { sk } from "../i18n/inicio/sk";
import { ro } from "../i18n/inicio/ro";
import { sr } from "../i18n/inicio/sr";
import { hr } from "../i18n/inicio/hr";
import { bs } from "../i18n/inicio/bs";
import { sl } from "../i18n/inicio/sl";
import { et } from "../i18n/inicio/et";
import { is } from "../i18n/inicio/is";
import { zh } from "../i18n/inicio/zh";
import type { TextosInicio } from "../i18n/inicio/tipos";
import { resolver, type Diccionarios } from "../i18n/resolver";
import type { Idioma, Trato } from "../tipos";

export type { TextosInicio } from "../i18n/inicio/tipos";

export const DICCIONARIOS_INICIO: Diccionarios<TextosInicio> = { es, pt, en, fr, de, it, nl, ja, ko, zh, pl, sv, da, nb, fi, ar, id, tr, bn, th, uk, uz, ru, ro, cs, el, hu, he, sr, bg, sk, ka, hr, mn, hy, sq, sl, et, is, lv, bs };

export function textosInicio(idioma: Idioma, trato: Trato, locale?: string): TextosInicio {
  return resolver(DICCIONARIOS_INICIO, idioma, trato, locale);
}
