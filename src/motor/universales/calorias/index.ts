import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoDe } from "./contenido/de";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { definir, type UiCalorias } from "./definicion";
import { textosDe } from "./textos/de";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";

export default definirUniversal<UiCalorias>({
  id: "calorias",
  concepto: "calorias",
  definir,
  textos: { de: textosDe, en: textosEn, es: textosEs },
  contenido: { de: contenidoDe, en: contenidoEn, es: contenidoEs },
  casos,
});
