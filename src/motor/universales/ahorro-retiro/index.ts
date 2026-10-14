import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoFr } from "./contenido/fr";
import { definir, type UiAhorroRetiro } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosFr } from "./textos/fr";

export default definirUniversal<UiAhorroRetiro>({
  id: "ahorro-retiro",
  concepto: "ahorro-retiro",
  definir,
  textos: { en: textosEn, es: textosEs, fr: textosFr },
  contenido: { en: contenidoEn, es: contenidoEs, fr: contenidoFr },
  casos,
});
