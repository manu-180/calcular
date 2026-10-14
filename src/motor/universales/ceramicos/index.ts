import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { definir, type UiCeramicos } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";

export default definirUniversal<UiCeramicos>({
  id: "ceramicos",
  concepto: "ceramicos",
  definir,
  textos: { es: textosEs, en: textosEn },
  contenido: { es: contenidoEs, en: contenidoEn },
  casos,
});
