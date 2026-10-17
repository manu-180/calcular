import { definirTextos } from "@/motor/edicion";
import mietzinsrechner from "../../ch/calculadoras/mietzinsrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(mietzinsrechner, {
  calculadora: "ch-fr.mietzinsrechner",
  slug: "calcul-loyer-taux-reference",
  campos: {
    miete: { etiqueta: "Loyer net actuel par mois" },
    refAlt: { etiqueta: "Taux de référence lors de la dernière adaptation du loyer", ayuda: "Il figure dans le bail ou dans la dernière adaptation du loyer." },
    monatAlt: { etiqueta: "Indice des prix à la consommation lors de la dernière adaptation (mois)" },
    kosten: { etiqueta: "Hausse générale des coûts (si invoquée)" },
  },
  filas: {
    neu: { etiqueta: "Loyer net adapté par mois" },
    differenz: { etiqueta: "Variation par mois" },
    total: { etiqueta: "Variation totale" },
    hypothek: { etiqueta: "Part du taux de référence" },
    teuerung: { etiqueta: "Part du renchérissement" },
    kosten: { etiqueta: "Part de la hausse des coûts" },
    refNeu: { etiqueta: "Taux de référence actuel" },
    likMonat: { etiqueta: "Indice jusqu'à" },
  },
  ...COMUN,
});
