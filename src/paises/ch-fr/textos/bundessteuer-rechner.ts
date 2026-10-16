import { definirTextos } from "@/motor/edicion";
import bundessteuerRechner from "../../ch/calculadoras/bundessteuer-rechner";
import { COMUN, ZIVILSTAND } from "../lib/comun";

export default definirTextos(bundessteuerRechner, {
  calculadora: "ch-fr.bundessteuer-rechner",
  slug: "impot-federal-direct",
  campos: {
    einkommen: { etiqueta: "Revenu imposable (impôt fédéral direct)", ayuda: "Revenu après toutes les déductions, tel qu'il figure dans la taxation de l'impôt fédéral direct." },
    zivilstand: { etiqueta: "État civil", opciones: ZIVILSTAND },
    kinder: { etiqueta: "Enfants dans le même ménage dont vous assumez l'essentiel de l'entretien" },
  },
  filas: {
    steuer: { etiqueta: "Impôt fédéral direct par an" },
    tarifsteuer: { etiqueta: "Impôt selon le barème" },
    ermaessigung: { etiqueta: "Réduction pour enfants" },
    durchschnitt: { etiqueta: "Taux d'imposition moyen" },
    grenzsatz: { etiqueta: "Taux marginal (sur les 100 francs suivants)" },
    tarif: { etiqueta: "Barème appliqué" },
  },
  ...COMUN,
});
