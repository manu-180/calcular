import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFr } from "./contenido/fr";
import { contenidoHe } from "./contenido/he";
import { contenidoIt } from "./contenido/it";
import { contenidoJa } from "./contenido/ja";
import { contenidoKo } from "./contenido/ko";
import { contenidoNl } from "./contenido/nl";
import { contenidoPt } from "./contenido/pt";
import { contenidoZh } from "./contenido/zh";
import { definir, type UiSumarDias } from "./definicion";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFr } from "./textos/fr";
import { textosHe } from "./textos/he";
import { textosIt } from "./textos/it";
import { textosJa } from "./textos/ja";
import { textosKo } from "./textos/ko";
import { textosNl } from "./textos/nl";
import { textosPt } from "./textos/pt";
import { textosZh } from "./textos/zh";

export default definirUniversal<UiSumarDias>({
  id: "sumar-dias",
  concepto: "sumar-dias",
  definir,
  textos: { de: textosDe, en: textosEn, es: textosEs, fr: textosFr, he: textosHe, it: textosIt, ja: textosJa, ko: textosKo, nl: textosNl, pt: textosPt, zh: textosZh },
  contenido: { de: contenidoDe, en: contenidoEn, es: contenidoEs, fr: contenidoFr, he: contenidoHe, it: contenidoIt, ja: contenidoJa, ko: contenidoKo, nl: contenidoNl, pt: contenidoPt, zh: contenidoZh },
  casos,
});
