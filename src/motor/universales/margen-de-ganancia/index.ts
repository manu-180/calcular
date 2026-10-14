import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoPt } from "./contenido/pt";
import { definir, type UiMargenDeGanancia } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosPt } from "./textos/pt";

export default definirUniversal<UiMargenDeGanancia>({
  id: "margen-de-ganancia",
  concepto: "margen-de-ganancia",
  definir,
  textos: { en: textosEn, es: textosEs, pt: textosPt },
  contenido: { en: contenidoEn, es: contenidoEs, pt: contenidoPt },
  casos,
});
