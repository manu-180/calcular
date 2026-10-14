import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { definir, type UiDiasEntreFechas } from "./definicion";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";

export default definirUniversal<UiDiasEntreFechas>({
  id: "dias-entre-fechas",
  concepto: "dias-entre-fechas",
  definir,
  textos: { de: textosDe, en: textosEn, es: textosEs },
  contenido: { de: contenidoDe, en: contenidoEn, es: contenidoEs },
  casos,
});
