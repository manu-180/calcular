import { definirTextos } from "@/motor/edicion";
import base from "../../cy/calculadoras/foros-kefalaiouchikon-kerdon";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cy-en.foros-kefalaiouchikon-kerdon",
  slug: "capital-gains-tax-calculator",
  campos: {
    timi: { etiqueta: "Sale price" },
    kostos: { etiqueta: "Acquisition cost adjusted for inflation", ayuda: "Purchase cost and improvements, adjusted with the Consumer Price Index." },
    exoda: { etiqueta: "Selling costs (agent, legal)" },
    exairesi: {
      etiqueta: "Exemption",
      opciones: { geniki: "General exemption", katoikia: "Main residence", georgiki: "Farmland sold by a farmer", kamia: "None" },
    },
    xrisimopoiimeni: { etiqueta: "Part of the exemption you used before" },
  },
  filas: {
    foros: { etiqueta: "Capital gains tax" },
    kerdos: { etiqueta: "Gain" },
    exairesi: { etiqueta: "Exemption used" },
    forologiteo: { etiqueta: "Taxable gain" },
    ypoloipoExairesis: { etiqueta: "Exemption left for the future" },
  },
  mensajes: MENSAJES,
});
