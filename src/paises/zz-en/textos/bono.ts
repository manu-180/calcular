import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-en.bono",
  slug: "half-year-bonus",
  campos: {
    sueldo: { etiqueta: "Gross monthly pay" },
    meses: { etiqueta: "Months worked in the half year" },
    region: { etiqueta: "Zone where you work" },
    regimen: { etiqueta: "Company size", opciones: { general: "Medium or large company", pequena: "Small company" } },
  },
  filas: {
    base: { etiqueta: "Pay used for the calculation" },
    bono: { etiqueta: "Bonus" },
    bonificacion: { etiqueta: "Extra payment" },
    total: { etiqueta: "Total you get" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Months go from 1 to 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Your pay is below the minimum for your zone, so the bonus is worked out with the minimum.",
  },
});
