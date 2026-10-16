import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/rsz-berekenen";
import { GEZIN, STATUUT } from "../lib/fr";

export default definirTextos(base, {
  calculadora: "be-fr.rsz-berekenen",
  slug: "calcul-cotisations-onss",
  campos: {
    bruto: { etiqueta: "Salaire mensuel brut" },
    statuut: { etiqueta: "Statut", opciones: STATUUT },
    gezin: { etiqueta: "Situation familiale (pour la cotisation spéciale)", opciones: GEZIN },
  },
  filas: {
    totaal: { etiqueta: "Total retenu par mois" },
    basis: { etiqueta: "Salaire sur lequel l'ONSS est calculée" },
    bijdrage: { etiqueta: "Cotisations personnelles ONSS" },
    werkbonusA: { etiqueta: "Moins : bonus à l'emploi bas salaires (volet A)" },
    werkbonusB: { etiqueta: "Moins : bonus à l'emploi très bas salaires (volet B)" },
    teBetalen: { etiqueta: "ONSS après bonus à l'emploi" },
    bbsz: { etiqueta: "Cotisation spéciale de sécurité sociale" },
    belastbaar: { etiqueta: "Salaire imposable (brut moins ONSS)" },
  },
  mensajes: {
    "Vul een brutoloon boven nul in.": "Indiquez un salaire brut supérieur à zéro.",
    "De werkbonus is berekend voor een voltijdse werknemer met een volledige maand prestaties. Werk je deeltijds of was je een deel van de maand afwezig, dan wordt hij in verhouding verminderd.":
      "Le bonus à l'emploi est calculé pour un travailleur à temps plein avec un mois complet de prestations. Si vous travaillez à temps partiel ou avez été absent une partie du mois, il est réduit en proportion.",
  },
});
