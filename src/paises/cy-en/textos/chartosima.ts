import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/chartosima";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.chartosima",
  slug: "stamp-duty-calculator",
  campos: { axia: { etiqueta: "Contract value" } },
  filas: { chartosima: { etiqueta: "Stamp duty" } },
  mensajes: MENSAJES,
});
