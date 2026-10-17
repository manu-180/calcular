import { definirTextos } from "@/motor/edicion";
import bvgRechner from "../../ch/calculadoras/bvg-rechner";
import { COMUN } from "../lib/comun";

export default definirTextos(bvgRechner, {
  calculadora: "ch-fr.bvg-rechner",
  slug: "calcul-lpp",
  campos: {
    jahreslohn: { etiqueta: "Salaire annuel AVS" },
    alter: { etiqueta: "Âge cette année (année civile moins année de naissance)" },
    guthaben: { etiqueta: "Avoir de vieillesse LPP actuel", ayuda: "Il figure sur votre certificat de prévoyance (part obligatoire)." },
    zins: { etiqueta: "Intérêt par an", ayuda: "Laissez vide : le taux d'intérêt minimal LPP s'applique." },
  },
  filas: {
    kapital: { etiqueta: "Avoir de vieillesse à 65 ans" },
    renteMonat: { etiqueta: "Rente de vieillesse LPP par mois" },
    renteJahr: { etiqueta: "Rente de vieillesse LPP par an" },
    koordinierterLohn: { etiqueta: "Salaire coordonné" },
    gutschriftHeute: { etiqueta: "Bonification de vieillesse cette année" },
    summeGutschriften: { etiqueta: "Total des bonifications futures" },
    zins: { etiqueta: "Intérêt retenu" },
  },
  tablas: { plan: "Avoir de vieillesse année par année" },
  ...COMUN,
});
