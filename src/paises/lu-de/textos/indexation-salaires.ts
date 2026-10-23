import { definirTextos } from "@/motor/edicion";
import indexationSalaires from "../../lu/calculadoras/indexation-salaires";
import { COMUN } from "../lib/comun";

export default definirTextos(indexationSalaires, {
  calculadora: "lu-de.indexation-salaires",
  slug: "indextranche-rechner",
  campos: {
    salaire: { etiqueta: "Aktueller Bruttomonatslohn" },
  },
  filas: {
    apres: { etiqueta: "Lohn nach der nächsten Indextranche" },
    hausse: { etiqueta: "Monatliche Erhöhung (2,5 %)" },
    reste: { etiqueta: "Noch nötiger Anstieg des Durchschnitts" },
    moyenne: { etiqueta: "Halbjahresdurchschnitt des IPCN" },
    mois: { etiqueta: "Letzter veröffentlichter Monat" },
    prochaineCote: { etiqueta: "Nächste Auslöseschwelle" },
    indice: { etiqueta: "Geltende Indexzahl" },
    base100: { etiqueta: "Lohn zum Index 100" },
  },
  ...COMUN,
});
