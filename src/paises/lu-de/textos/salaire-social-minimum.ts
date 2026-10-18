import { definirTextos } from "@/motor/edicion";
import salaireSocialMinimum from "../../lu/calculadoras/salaire-social-minimum";
import { COMUN } from "../lib/comun";

export default definirTextos(salaireSocialMinimum, {
  calculadora: "lu-de.salaire-social-minimum",
  slug: "mindestlohn-rechner",
  campos: {
    categorie: { etiqueta: "Situation des Arbeitnehmers", opciones: { "non-qualifie": "18 Jahre und älter, unqualifiziert", "qualifie": "18 Jahre und älter, qualifiziert", "17-18": "17 bis 18 Jahre", "15-17": "15 bis 17 Jahre" } },
    heures: { etiqueta: "Arbeitsstunden pro Monat", ayuda: "173 Stunden entsprechen einer Vollzeitstelle." },
  },
  filas: {
    mensuel: { etiqueta: "Monatlicher sozialer Mindestlohn brutto" },
    horaire: { etiqueta: "Stündlicher Mindestlohn brutto" },
    annuel: { etiqueta: "Für zwölf Monate" },
    mensuelPlein: { etiqueta: "Betrag für eine Vollzeitstelle (173 Stunden)" },
  },
  ...COMUN,
});
