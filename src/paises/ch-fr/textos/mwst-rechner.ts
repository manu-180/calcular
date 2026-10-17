import { definirTextos } from "@/motor/edicion";
import mwstRechner from "../../ch/calculadoras/mwst-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(mwstRechner, {
  calculadora: "ch-fr.mwst-rechner",
  slug: "calcul-tva",
  campos: {
    betrag: { etiqueta: "Montant en francs" },
    richtung: { etiqueta: "Que voulez-vous calculer ?", opciones: { "zuschlagen": "Ajouter la TVA (montant hors TVA)", "herausrechnen": "Extraire la TVA (montant TVA comprise)" } },
    satz: { etiqueta: "Taux", opciones: { "normal": "Taux normal", "reduziert": "Taux réduit (par exemple denrées alimentaires, médicaments, livres)", "beherbergung": "Taux spécial pour l'hébergement (nuitée avec petit-déjeuner)" } },
  },
  filas: {
    mwst: { etiqueta: "TVA" },
    netto: { etiqueta: "Montant hors TVA" },
    brutto: { etiqueta: "Montant TVA comprise" },
    satz: { etiqueta: "Taux" },
  },
  ...COMUN,
});
