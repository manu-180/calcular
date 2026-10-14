import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoIt } from "./contenido/it";
import { definir, type UiVariacion } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosIt } from "./textos/it";

export default definirUniversal<UiVariacion>({
  id: "variacion-porcentual",
  concepto: "variacion-porcentual",
  definir,
  textos: { en: textosEn, es: textosEs, it: textosIt },
  contenido: { en: contenidoEn, es: contenidoEs, it: contenidoIt },
  casos,
});
