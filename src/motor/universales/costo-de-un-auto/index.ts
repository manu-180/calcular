import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoIt } from "./contenido/it";
import { definir, type UiCostoDeUnAuto } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosIt } from "./textos/it";

export default definirUniversal<UiCostoDeUnAuto>({
  id: "costo-de-un-auto",
  concepto: "costo-de-un-auto",
  definir,
  textos: { en: textosEn, es: textosEs, it: textosIt },
  contenido: { en: contenidoEn, es: contenidoEs, it: contenidoIt },
  casos,
});
