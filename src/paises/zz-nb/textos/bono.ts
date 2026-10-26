import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-nb.bono",
  slug: "halvarsbonus",
  campos: {
    sueldo: { etiqueta: "Månedslønn før skatt" },
    meses: { etiqueta: "Måneder jobbet i halvåret" },
    region: { etiqueta: "Sonen du jobber i" },
    regimen: { etiqueta: "Størrelsen på bedriften", opciones: { general: "Mellomstor eller stor bedrift", pequena: "Liten bedrift" } },
  },
  filas: {
    base: { etiqueta: "Lønn brukt i beregningen" },
    bono: { etiqueta: "Bonus" },
    bonificacion: { etiqueta: "Tillegg" },
    total: { etiqueta: "Totalt til deg" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Månedene går fra 1 til 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Lønnen din er lavere enn minstelønnen i sonen din, så bonusen beregnes ut fra minstelønnen.",
  },
});
