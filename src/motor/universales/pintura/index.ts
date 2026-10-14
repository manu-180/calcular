import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoPt } from "./contenido/pt";
import { definir, type UiPintura } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosPt } from "./textos/pt";

export default definirUniversal<UiPintura>({
  id: "pintura",
  concepto: "pintura",
  definir,
  textos: { en: textosEn, es: textosEs, pt: textosPt },
  contenido: { en: contenidoEn, es: contenidoEs, pt: contenidoPt },
  casos,
});
