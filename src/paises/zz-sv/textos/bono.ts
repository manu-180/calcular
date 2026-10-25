import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-sv.bono",
  slug: "halvarsbonus",
  campos: {
    sueldo: { etiqueta: "Månadslön före skatt" },
    meses: { etiqueta: "Månader du arbetat under halvåret" },
    region: { etiqueta: "Zon där du arbetar" },
    regimen: { etiqueta: "Företagets storlek", opciones: { general: "Medelstort eller stort företag", pequena: "Litet företag" } },
  },
  filas: {
    base: { etiqueta: "Lön som används i beräkningen" },
    bono: { etiqueta: "Bonus" },
    bonificacion: { etiqueta: "Tillägg" },
    total: { etiqueta: "Totalt du får" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Månaderna går från 1 till 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Din lön är lägre än minimilönen i din zon, så bonusen räknas på minimilönen.",
  },
});
