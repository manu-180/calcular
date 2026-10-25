import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoAr } from "./contenido/ar";
import { contenidoBn } from "./contenido/bn";
import { contenidoDa } from "./contenido/da";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFi } from "./contenido/fi";
import { contenidoFr } from "./contenido/fr";
import { contenidoId } from "./contenido/id";
import { contenidoIt } from "./contenido/it";
import { contenidoJa } from "./contenido/ja";
import { contenidoKo } from "./contenido/ko";
import { contenidoNb } from "./contenido/nb";
import { contenidoNl } from "./contenido/nl";
import { contenidoPl } from "./contenido/pl";
import { contenidoPt } from "./contenido/pt";
import { contenidoSv } from "./contenido/sv";
import { contenidoTh } from "./contenido/th";
import { contenidoTr } from "./contenido/tr";
import { contenidoZh } from "./contenido/zh";
import { definir, type UiInteresSimple } from "./definicion";
import { textosAr } from "./textos/ar";
import { textosBn } from "./textos/bn";
import { textosDa } from "./textos/da";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFi } from "./textos/fi";
import { textosFr } from "./textos/fr";
import { textosId } from "./textos/id";
import { textosIt } from "./textos/it";
import { textosJa } from "./textos/ja";
import { textosKo } from "./textos/ko";
import { textosNb } from "./textos/nb";
import { textosNl } from "./textos/nl";
import { textosPl } from "./textos/pl";
import { textosPt } from "./textos/pt";
import { textosSv } from "./textos/sv";
import { textosTh } from "./textos/th";
import { textosTr } from "./textos/tr";
import { textosZh } from "./textos/zh";

export default definirUniversal<UiInteresSimple>({
  id: "interes-simple",
  concepto: "interes-simple",
  definir,
  textos: { ar: textosAr, bn: textosBn, da: textosDa, de: textosDe, en: textosEn, es: textosEs, fi: textosFi, fr: textosFr, id: textosId, it: textosIt, ja: textosJa, ko: textosKo, nb: textosNb, nl: textosNl, pl: textosPl, pt: textosPt, sv: textosSv, th: textosTh, tr: textosTr, zh: textosZh },
  contenido: { ar: contenidoAr, bn: contenidoBn, da: contenidoDa, de: contenidoDe, en: contenidoEn, es: contenidoEs, fi: contenidoFi, fr: contenidoFr, id: contenidoId, it: contenidoIt, ja: contenidoJa, ko: contenidoKo, nb: contenidoNb, nl: contenidoNl, pl: contenidoPl, pt: contenidoPt, sv: contenidoSv, th: contenidoTh, tr: contenidoTr, zh: contenidoZh },
  casos,
});
