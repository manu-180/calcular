import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { definir, type UiSumarDias } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";

export default definirUniversal<UiSumarDias>({
  id: "sumar-dias",
  concepto: "sumar-dias",
  definir,
  textos: { en: textosEn, es: textosEs },
  contenido: { en: contenidoEn, es: contenidoEs },
  casos,
});
