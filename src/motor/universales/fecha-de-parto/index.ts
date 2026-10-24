import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoCs } from "./contenido/cs";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFr } from "./contenido/fr";
import { contenidoIt } from "./contenido/it";
import { contenidoJa } from "./contenido/ja";
import { contenidoKo } from "./contenido/ko";
import { contenidoNl } from "./contenido/nl";
import { contenidoPt } from "./contenido/pt";
import { contenidoZh } from "./contenido/zh";
import { definir, type UiFechaDeParto } from "./definicion";
import { textosCs } from "./textos/cs";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFr } from "./textos/fr";
import { textosIt } from "./textos/it";
import { textosJa } from "./textos/ja";
import { textosKo } from "./textos/ko";
import { textosNl } from "./textos/nl";
import { textosPt } from "./textos/pt";
import { textosZh } from "./textos/zh";

export default definirUniversal<UiFechaDeParto>({
  id: "fecha-de-parto",
  concepto: "fecha-de-parto",
  definir,
  textos: { cs: textosCs, de: textosDe, en: textosEn, es: textosEs, fr: textosFr, it: textosIt, ja: textosJa, ko: textosKo, nl: textosNl, pt: textosPt, zh: textosZh },
  contenido: { cs: contenidoCs, de: contenidoDe, en: contenidoEn, es: contenidoEs, fr: contenidoFr, it: contenidoIt, ja: contenidoJa, ko: contenidoKo, nl: contenidoNl, pt: contenidoPt, zh: contenidoZh },
  casos,
});
