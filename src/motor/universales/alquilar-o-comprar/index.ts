import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoIt } from "./contenido/it";
import { contenidoPt } from "./contenido/pt";
import { definir, type UiAlquilarOComprar } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosIt } from "./textos/it";
import { textosPt } from "./textos/pt";

export default definirUniversal<UiAlquilarOComprar>({
  id: "alquilar-o-comprar",
  concepto: "alquilar-o-comprar",
  definir,
  textos: { en: textosEn, es: textosEs, it: textosIt, pt: textosPt },
  contenido: { en: contenidoEn, es: contenidoEs, it: contenidoIt, pt: contenidoPt },
  casos,
});
