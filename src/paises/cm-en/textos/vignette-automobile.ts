import { definirTextos } from "@/motor/edicion";
import base from "../../cm/calculadoras/vignette-automobile";
import { MENSAJES } from "../lib/comun";

export default definirTextos(base, {
  calculadora: "cm-en.vignette-automobile",
  slug: "vehicle-stamp-duty",
  campos: {
    type: {
      etiqueta: "Vehicle type",
      opciones: {
        autre: "Private car or other vehicle",
        transport: "Public transport of people or goods (with licence)",
        "moto-2-roues": "Two-wheel motorcycle",
        "moto-3-roues": "Three-wheel motorcycle",
      },
    },
    cv: { etiqueta: "Fiscal horsepower", ayuda: "It is shown on the registration card." },
  },
  filas: {
    droit: { etiqueta: "Vehicle stamp duty for the year" },
  },
  mensajes: MENSAJES,
});
