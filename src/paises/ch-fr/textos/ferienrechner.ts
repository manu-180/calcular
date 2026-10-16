import { definirTextos } from "@/motor/edicion";
import ferienrechner from "../../ch/calculadoras/ferienrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(ferienrechner, {
  calculadora: "ch-fr.ferienrechner",
  slug: "calcul-vacances",
  campos: {
    alter: { etiqueta: "Âge" },
    tageProWoche: { etiqueta: "Jours de travail par semaine" },
    monate: { etiqueta: "Mois dans l'année de service", ayuda: "Pour une année de service incomplète, par exemple en cas d'entrée ou de départ." },
    vertragWochen: { etiqueta: "Semaines de vacances selon le contrat (si plus que la loi)" },
  },
  filas: {
    tage: { etiqueta: "Jours de vacances pour cette période" },
    wochen: { etiqueta: "Semaines de vacances par année de service" },
    tageJahr: { etiqueta: "Jours de vacances pour une année de service complète" },
    zuschlag: { etiqueta: "Supplément vacances théorique pour un salaire horaire" },
  },
  ...COMUN,
});
