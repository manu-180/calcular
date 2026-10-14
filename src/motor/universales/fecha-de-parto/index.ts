import { definirUniversal } from "../tipos";
import { casos } from "./casos";
import { contenidoEn } from "./contenido/en";
import { contenidoEs } from "./contenido/es";
import { contenidoIt } from "./contenido/it";
import { contenidoPt } from "./contenido/pt";
import { definir, type UiFechaDeParto } from "./definicion";
import { textosEn } from "./textos/en";
import { textosEs } from "./textos/es";
import { textosIt } from "./textos/it";
import { textosPt } from "./textos/pt";

export default definirUniversal<UiFechaDeParto>({
  id: "fecha-de-parto",
  concepto: "fecha-de-parto",
  definir,
  textos: { en: textosEn, es: textosEs, it: textosIt, pt: textosPt },
  contenido: { en: contenidoEn, es: contenidoEs, it: contenidoIt, pt: contenidoPt },
  casos,
});
