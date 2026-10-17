import { definirTextos } from "@/motor/edicion";
import allocationsFamiliales from "../../lu/calculadoras/allocations-familiales";
import { COMUN } from "../lib/comun";

export default definirTextos(allocationsFamiliales, {
  calculadora: "lu-de.allocations-familiales",
  slug: "familienzulagen-rechner",
  campos: {
    moins6: { etiqueta: "Kinder unter 6 Jahren" },
    de6a11: { etiqueta: "Kinder von 6 bis 11 Jahren" },
    plus12: { etiqueta: "Kinder ab 12 Jahren" },
  },
  filas: {
    mensuel: { etiqueta: "Familienzulagen pro Monat" },
    annuel: { etiqueta: "Für zwölf Monate" },
    rentree: { etiqueta: "Schulanfangszulage (einmal im Jahr)" },
    total: { etiqueta: "Gesamtbetrag pro Jahr" },
  },
  ...COMUN,
});
