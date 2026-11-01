import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoAr } from "./contenido/ar";
import { contenidoBg } from "./contenido/bg";
import { contenidoBn } from "./contenido/bn";
import { contenidoCs } from "./contenido/cs";
import { contenidoDa } from "./contenido/da";
import { contenidoDe } from "./contenido/de";
import { contenidoEl } from "./contenido/el";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoEt } from "./contenido/et";
import { contenidoFi } from "./contenido/fi";
import { contenidoFr } from "./contenido/fr";
import { contenidoHe } from "./contenido/he";
import { contenidoHr } from "./contenido/hr";
import { contenidoHu } from "./contenido/hu";
import { contenidoHy } from "./contenido/hy";
import { contenidoId } from "./contenido/id";
import { contenidoIt } from "./contenido/it";
import { contenidoJa } from "./contenido/ja";
import { contenidoKa } from "./contenido/ka";
import { contenidoKo } from "./contenido/ko";
import { contenidoMn } from "./contenido/mn";
import { contenidoNb } from "./contenido/nb";
import { contenidoNl } from "./contenido/nl";
import { contenidoPl } from "./contenido/pl";
import { contenidoPt } from "./contenido/pt";
import { contenidoRo } from "./contenido/ro";
import { contenidoRu } from "./contenido/ru";
import { contenidoSk } from "./contenido/sk";
import { contenidoSq } from "./contenido/sq";
import { contenidoSl } from "./contenido/sl";
import { contenidoSr } from "./contenido/sr";
import { contenidoSv } from "./contenido/sv";
import { contenidoTh } from "./contenido/th";
import { contenidoTr } from "./contenido/tr";
import { contenidoUk } from "./contenido/uk";
import { contenidoUz } from "./contenido/uz";
import { contenidoZh } from "./contenido/zh";
import { definir, type UiInteresCompuesto } from "./definicion";
import { textosAr } from "./textos/ar";
import { textosBg } from "./textos/bg";
import { textosBn } from "./textos/bn";
import { textosCs } from "./textos/cs";
import { textosDa } from "./textos/da";
import { textosDe } from "./textos/de";
import { textosEl } from "./textos/el";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosEt } from "./textos/et";
import { textosFi } from "./textos/fi";
import { textosFr } from "./textos/fr";
import { textosHe } from "./textos/he";
import { textosHr } from "./textos/hr";
import { textosHu } from "./textos/hu";
import { textosHy } from "./textos/hy";
import { textosId } from "./textos/id";
import { textosIt } from "./textos/it";
import { textosJa } from "./textos/ja";
import { textosKa } from "./textos/ka";
import { textosKo } from "./textos/ko";
import { textosMn } from "./textos/mn";
import { textosNb } from "./textos/nb";
import { textosNl } from "./textos/nl";
import { textosPl } from "./textos/pl";
import { textosPt } from "./textos/pt";
import { textosRo } from "./textos/ro";
import { textosRu } from "./textos/ru";
import { textosSk } from "./textos/sk";
import { textosSq } from "./textos/sq";
import { textosSl } from "./textos/sl";
import { textosSr } from "./textos/sr";
import { textosSv } from "./textos/sv";
import { textosTh } from "./textos/th";
import { textosTr } from "./textos/tr";
import { textosUk } from "./textos/uk";
import { textosUz } from "./textos/uz";
import { textosZh } from "./textos/zh";

export default definirUniversal<UiInteresCompuesto>({
  id: "interes-compuesto",
  concepto: "interes-compuesto",
  definir,
  textos: { ar: textosAr, bg: textosBg, bn: textosBn, cs: textosCs, da: textosDa, de: textosDe, el: textosEl, en: textosEn, es: textosEs, et: textosEt, fi: textosFi, fr: textosFr, he: textosHe, hr: textosHr, hu: textosHu, hy: textosHy, id: textosId, it: textosIt, ja: textosJa, ka: textosKa, ko: textosKo, mn: textosMn, nb: textosNb, nl: textosNl, pl: textosPl, pt: textosPt, ro: textosRo, ru: textosRu, sk: textosSk, sq: textosSq, sl: textosSl, sr: textosSr, sv: textosSv, th: textosTh, tr: textosTr, uk: textosUk, uz: textosUz, zh: textosZh },
  contenido: { ar: contenidoAr, bg: contenidoBg, bn: contenidoBn, cs: contenidoCs, da: contenidoDa, de: contenidoDe, el: contenidoEl, en: contenidoEn, es: contenidoEs, et: contenidoEt, fi: contenidoFi, fr: contenidoFr, he: contenidoHe, hr: contenidoHr, hu: contenidoHu, hy: contenidoHy, id: contenidoId, it: contenidoIt, ja: contenidoJa, ka: contenidoKa, ko: contenidoKo, mn: contenidoMn, nb: contenidoNb, nl: contenidoNl, pl: contenidoPl, pt: contenidoPt, ro: contenidoRo, ru: contenidoRu, sk: contenidoSk, sq: contenidoSq, sl: contenidoSl, sr: contenidoSr, sv: contenidoSv, th: contenidoTh, tr: contenidoTr, uk: contenidoUk, uz: contenidoUz, zh: contenidoZh },
  casos,
});
