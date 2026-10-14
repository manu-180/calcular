import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFr } from "./contenido/fr";
import { definir, type UiAumentoDeSueldo } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFr } from "./textos/fr";

export default definirUniversal<UiAumentoDeSueldo>({
  id: "aumento-de-sueldo",
  concepto: "aumento-de-sueldo",
  definir,
  textos: { en: textosEn, es: textosEs, fr: textosFr },
  contenido: { en: contenidoEn, es: contenidoEs, fr: contenidoFr },
  casos,
});
