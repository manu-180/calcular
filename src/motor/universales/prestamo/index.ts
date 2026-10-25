import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoDa } from "./contenido/da";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFr } from "./contenido/fr";
import { contenidoIt } from "./contenido/it";
import { contenidoJa } from "./contenido/ja";
import { contenidoKo } from "./contenido/ko";
import { contenidoNb } from "./contenido/nb";
import { contenidoNl } from "./contenido/nl";
import { contenidoPl } from "./contenido/pl";
import { contenidoPt } from "./contenido/pt";
import { contenidoSv } from "./contenido/sv";
import { contenidoZh } from "./contenido/zh";
import { definir, type UiPrestamo } from "./definicion";
import { textosDa } from "./textos/da";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFr } from "./textos/fr";
import { textosIt } from "./textos/it";
import { textosJa } from "./textos/ja";
import { textosKo } from "./textos/ko";
import { textosNb } from "./textos/nb";
import { textosNl } from "./textos/nl";
import { textosPl } from "./textos/pl";
import { textosPt } from "./textos/pt";
import { textosSv } from "./textos/sv";
import { textosZh } from "./textos/zh";

export default definirUniversal<UiPrestamo>({
  id: "prestamo",
  concepto: "prestamo",
  definir,
  textos: { da: textosDa, de: textosDe, en: textosEn, es: textosEs, fr: textosFr, it: textosIt, ja: textosJa, ko: textosKo, nb: textosNb, nl: textosNl, pl: textosPl, pt: textosPt, sv: textosSv, zh: textosZh },
  contenido: { da: contenidoDa, de: contenidoDe, en: contenidoEn, es: contenidoEs, fr: contenidoFr, it: contenidoIt, ja: contenidoJa, ko: contenidoKo, nb: contenidoNb, nl: contenidoNl, pl: contenidoPl, pt: contenidoPt, sv: contenidoSv, zh: contenidoZh },
  casos,
});
