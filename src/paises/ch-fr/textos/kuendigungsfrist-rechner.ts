import { definirTextos } from "@/motor/edicion";
import kuendigungsfristRechner from "../../ch/calculadoras/kuendigungsfrist-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(kuendigungsfristRechner, {
  calculadora: "ch-fr.kuendigungsfrist-rechner",
  slug: "delai-de-conge",
  campos: {
    beginn: { etiqueta: "Début des rapports de travail" },
    zugang: { etiqueta: "Jour où le congé parvient au destinataire" },
    probezeit: { etiqueta: "Temps d'essai en mois", ayuda: "Sans accord, le premier mois est le temps d'essai. Trois mois au plus sont possibles." },
    vertragFrist: { etiqueta: "Délai de congé selon le contrat en mois (s'il diffère)" },
  },
  filas: {
    ende: { etiqueta: "Dernier jour de travail (fin des rapports de travail)" },
    frist: { etiqueta: "Délai de congé" },
    dienstjahr: { etiqueta: "Année de service à la réception du congé" },
  },
  ...COMUN,
});
