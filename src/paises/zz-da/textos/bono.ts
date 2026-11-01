import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-da.bono",
  slug: "halvaarsbonus",
  campos: {
    sueldo: { etiqueta: "Månedsløn før skat" },
    meses: { etiqueta: "Måneder arbejdet i halvåret" },
    region: { etiqueta: "Zone, hvor du arbejder" },
    regimen: { etiqueta: "Virksomhedens størrelse", opciones: { general: "Mellemstor eller stor virksomhed", pequena: "Lille virksomhed" } },
  },
  filas: {
    base: { etiqueta: "Løn brugt i beregningen" },
    bono: { etiqueta: "Bonus" },
    bonificacion: { etiqueta: "Tillæg" },
    total: { etiqueta: "I alt til dig" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Månederne går fra 1 til 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Din løn er under mindstelønnen i din zone, så bonussen beregnes ud fra mindstelønnen.",
  },
});
