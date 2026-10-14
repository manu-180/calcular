import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFr } from "./contenido/fr";
import { contenidoIt } from "./contenido/it";
import { contenidoPt } from "./contenido/pt";
import { definir, type UiPropina } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFr } from "./textos/fr";
import { textosIt } from "./textos/it";
import { textosPt } from "./textos/pt";

export default definirUniversal<UiPropina>({
  id: "propina",
  concepto: "propina",
  definir,
  textos: { en: textosEn, es: textosEs, fr: textosFr, it: textosIt, pt: textosPt },
  contenido: { en: contenidoEn, es: contenidoEs, fr: contenidoFr, it: contenidoIt, pt: contenidoPt },
  casos,
});
