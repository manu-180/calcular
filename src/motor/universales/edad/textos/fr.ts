import type { TextosUi } from "../../tipos";
import { duracionFr } from "../../dias-entre-fechas/textos/fr";
import type { UiEdad } from "../definicion";

export const textosFr: TextosUi<UiEdad> = {
  slug: "calcul-age",
  ui: () => ({
    nacimiento: "Date de naissance",
    referencia: "Âge au",
    referenciaAyuda: "Aujourd’hui par défaut. Changez la date pour connaître l’âge à un autre jour.",
    edad: "Âge",
    anios: "Âge en années",
    totalMeses: "En mois",
    totalSemanas: "En semaines",
    totalDias: "En jours",
    proximo: "Prochain anniversaire",
    faltan: "Jours restants",
    cumplira: "Âge à cet anniversaire",
    duracion: duracionFr,
    errorFutura: "La date de naissance ne peut pas être après la date choisie.",
    cumpleHoy: (anios) => `C’est l’anniversaire aujourd’hui : ${anios} ans.`,
    nota29: "Pour une personne née un 29 février, l’anniversaire tombe le 28 février les années non bissextiles.",
  }),
};
