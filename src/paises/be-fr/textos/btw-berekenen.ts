import { definirTextos } from "@/motor/edicion";
import base from "../../be/calculadoras/btw-berekenen";

export default definirTextos(base, {
  calculadora: "be-fr.btw-berekenen",
  slug: "calcul-tva",
  campos: {
    bedrag: { etiqueta: "Montant" },
    richting: {
      etiqueta: "Que voulez-vous calculer ?",
      opciones: { erbij: "Ajouter la TVA (le montant est hors TVA)", eraf: "Retirer la TVA (le montant est TVA comprise)" },
    },
    tarief: {
      etiqueta: "Taux de TVA",
      opciones: { standaard: "Taux normal (la plupart des biens et services)", tussen: "Taux intermédiaire", verlaagd: "Taux réduit", nul: "Taux zéro" },
    },
  },
  filas: {
    btw: { etiqueta: "TVA" },
    exclusief: { etiqueta: "Montant hors TVA" },
    inclusief: { etiqueta: "Montant TVA comprise" },
    tarief: { etiqueta: "Taux de TVA" },
  },
});
