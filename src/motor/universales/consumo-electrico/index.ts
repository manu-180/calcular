import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoNl } from "./contenido/nl";
import { definir, type UiConsumoElectrico } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosNl } from "./textos/nl";

export default definirUniversal<UiConsumoElectrico>({
  id: "consumo-electrico",
  concepto: "consumo-electrico",
  definir,
  textos: { en: textosEn, es: textosEs, nl: textosNl },
  contenido: { en: contenidoEn, es: contenidoEs, nl: contenidoNl },
  casos,
});
