import { definirTextos } from "@/motor/edicion";
import arbeitslosengeldRechner from "../../ch/calculadoras/arbeitslosengeld-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(arbeitslosengeldRechner, {
  calculadora: "ch-fr.arbeitslosengeld-rechner",
  slug: "indemnite-chomage",
  campos: {
    verdienst: { etiqueta: "Salaire mensuel moyen des 6 ou 12 derniers mois", ayuda: "La plus élevée des deux moyennes est déterminante." },
    unterhalt: { etiqueta: "Obligation d'entretien envers des enfants de moins de 25 ans" },
    ivRente: { etiqueta: "Rente AI correspondant à un taux d'invalidité d'au moins 40 %" },
    alter: { etiqueta: "Âge" },
    beitragsmonate: { etiqueta: "Mois de cotisation au cours des deux dernières années" },
  },
  filas: {
    taggeld: { etiqueta: "Indemnité journalière brute" },
    satz: { etiqueta: "Part du gain assuré" },
    monat: { etiqueta: "Par mois brut (21,7 indemnités)" },
    versichert: { etiqueta: "Gain assuré par mois" },
    anzahl: { etiqueta: "Nombre maximal d'indemnités journalières" },
    gesamt: { etiqueta: "Total si toutes les indemnités sont touchées" },
  },
  ...COMUN,
});
