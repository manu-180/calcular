import { definirTextos } from "@/motor/edicion";
import ueberstundenRechner from "../../ch/calculadoras/ueberstunden-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(ueberstundenRechner, {
  calculadora: "ch-fr.ueberstunden-rechner",
  slug: "heures-supplementaires",
  campos: {
    lohnart: { etiqueta: "Type de salaire", opciones: { "monat": "Salaire mensuel", "stunde": "Salaire horaire" } },
    lohn: { etiqueta: "Salaire brut (par mois ou par heure)" },
    wochenstunden: { etiqueta: "Durée de travail contractuelle par semaine (heures)" },
    stunden: { etiqueta: "Nombre d'heures supplémentaires" },
    zuschlag: { etiqueta: "Supplément selon le contrat", ayuda: "Laissez vide : le supplément légal s'applique." },
  },
  filas: {
    total: { etiqueta: "Rémunération des heures supplémentaires" },
    grund: { etiqueta: "Salaire normal pour ces heures" },
    zuschlag: { etiqueta: "Supplément" },
    satz: { etiqueta: "Taux du supplément" },
    stundenlohn: { etiqueta: "Salaire horaire" },
  },
  ...COMUN,
});
