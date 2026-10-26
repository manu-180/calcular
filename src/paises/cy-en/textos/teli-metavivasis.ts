import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/teli-metavivasis";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.teli-metavivasis",
  slug: "property-transfer-fees",
  campos: {
    axia: { etiqueta: "Property value" },
    fpa: { etiqueta: "The purchase was subject to VAT", ayuda: "Usually the case for new property bought from a developer." },
  },
  filas: {
    plirotea: { etiqueta: "Transfer fees you pay" },
    plira: { etiqueta: "Fees on the full scale" },
    meiosi: { etiqueta: "Reduction or exemption" },
  },
  mensajes: MENSAJES,
});
