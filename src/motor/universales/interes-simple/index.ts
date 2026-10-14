import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { definir, type UiInteresSimple } from "./definicion";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";

export default definirUniversal<UiInteresSimple>({
  id: "interes-simple",
  concepto: "interes-simple",
  definir,
  textos: { de: textosDe, en: textosEn, es: textosEs },
  contenido: { de: contenidoDe, en: contenidoEn, es: contenidoEs },
  casos,
});
