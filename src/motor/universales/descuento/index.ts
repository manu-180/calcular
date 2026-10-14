import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoIt } from "./contenido/it";
import { definir, type UiDescuento } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosIt } from "./textos/it";

export default definirUniversal<UiDescuento>({
  id: "descuento",
  concepto: "descuento",
  definir,
  textos: { en: textosEn, es: textosEs, it: textosIt },
  contenido: { en: contenidoEn, es: contenidoEs, it: contenidoIt },
  casos,
});
