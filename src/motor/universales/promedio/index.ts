import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { definir, type UiPromedio } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";

export default definirUniversal<UiPromedio>({
  id: "promedio",
  concepto: "promedio",
  definir,
  textos: { en: textosEn, es: textosEs },
  contenido: { en: contenidoEn, es: contenidoEs },
  casos,
});
