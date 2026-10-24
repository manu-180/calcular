import { definirTextos } from "@/motor/edicion";
import coutEmployeur from "../../lu/calculadoras/cout-employeur";
import { COMUN } from "../lib/comun";

export default definirTextos(coutEmployeur, {
  calculadora: "lu-de.cout-employeur",
  slug: "arbeitgeberkosten-rechner",
  campos: {
    brut: { etiqueta: "Monatlicher Bruttolohn" },
    mutualite: { etiqueta: "Klasse der Mutualität der Arbeitgeber", ayuda: "Die Sätze 2026 jeder Klasse veröffentlicht das CCSS." },
  },
  filas: {
    cout: { etiqueta: "Monatliche Kosten für den Arbeitgeber" },
    charges: { etiqueta: "Arbeitgeberbeiträge" },
    maladie: { etiqueta: "Krankenversicherung (Arbeitgeberanteil)" },
    pension: { etiqueta: "Rentenversicherung (Arbeitgeberanteil)" },
    accident: { etiqueta: "Unfallversicherung" },
    sante: { etiqueta: "Arbeitsmedizin" },
    mutualite: { etiqueta: "Mutualität der Arbeitgeber" },
    annuel: { etiqueta: "Kosten für zwölf Monate" },
  },
  ...COMUN,
});
