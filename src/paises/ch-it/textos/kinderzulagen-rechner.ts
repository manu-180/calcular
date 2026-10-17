import { definirTextos } from "@/motor/edicion";
import kinderzulagenRechner from "../../ch/calculadoras/kinderzulagen-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(kinderzulagenRechner, {
  calculadora: "ch-it.kinderzulagen-rechner",
  slug: "assegni-familiari",
  campos: {
    kinder: { etiqueta: "Figli fino a 16 anni" },
    inAusbildung: { etiqueta: "Figli in formazione (da 15 a 25 anni)" },
    kantonKinder: { etiqueta: "Assegno per i figli nel tuo cantone (se più alto)", ayuda: "Lascia vuoto: vale il minimo legale." },
    kantonAusbildung: { etiqueta: "Assegno di formazione nel tuo cantone (se più alto)" },
  },
  filas: {
    monat: { etiqueta: "Assegni familiari al mese" },
    jahr: { etiqueta: "All'anno" },
    kinderzulage: { etiqueta: "Assegno per i figli per ogni figlio" },
    ausbildungszulage: { etiqueta: "Assegno di formazione per ogni figlio" },
  },
  ...COMUN,
});
