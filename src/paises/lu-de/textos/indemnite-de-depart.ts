import { definirTextos } from "@/motor/edicion";
import indemniteDeDepart from "../../lu/calculadoras/indemnite-de-depart";
import { COMUN } from "../lib/comun";

export default definirTextos(indemniteDeDepart, {
  calculadora: "lu-de.indemnite-de-depart",
  slug: "abfindung-rechner",
  campos: {
    salaire: { etiqueta: "Durchschnittlicher Bruttomonatslohn der letzten zwölf Monate", ayuda: "Ohne Überstunden und Gratifikationen." },
    anciennete: { etiqueta: "Betriebszugehörigkeit am Ende der Kündigungsfrist (Jahre)" },
  },
  filas: {
    indemnite: { etiqueta: "Gesetzliche Mindestabfindung" },
    mois: { etiqueta: "Monatslöhne" },
  },
  ...COMUN,
});
