import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { definir, type UiHorasTrabajadas } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";

export default definirUniversal<UiHorasTrabajadas>({
  id: "horas-trabajadas",
  concepto: "horas-trabajadas",
  definir,
  textos: { es: textosEs, en: textosEn },
  contenido: { es: contenidoEs, en: contenidoEn },
  casos,
});
