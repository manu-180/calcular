import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFr } from "./contenido/fr";
import { contenidoIt } from "./contenido/it";
import { contenidoNl } from "./contenido/nl";
import { contenidoPt } from "./contenido/pt";
import { definir, type UiEdad } from "./definicion";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFr } from "./textos/fr";
import { textosIt } from "./textos/it";
import { textosNl } from "./textos/nl";
import { textosPt } from "./textos/pt";

export default definirUniversal<UiEdad>({
  id: "edad",
  concepto: "edad",
  definir,
  textos: { de: textosDe, en: textosEn, es: textosEs, fr: textosFr, it: textosIt, nl: textosNl, pt: textosPt },
  contenido: { de: contenidoDe, en: contenidoEn, es: contenidoEs, fr: contenidoFr, it: contenidoIt, nl: contenidoNl, pt: contenidoPt },
  casos,
});
