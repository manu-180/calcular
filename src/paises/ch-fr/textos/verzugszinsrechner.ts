import { definirTextos } from "@/motor/edicion";
import verzugszinsrechner from "../../ch/calculadoras/verzugszinsrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(verzugszinsrechner, {
  calculadora: "ch-fr.verzugszinsrechner",
  slug: "interet-moratoire",
  campos: {
    betrag: { etiqueta: "Montant dû" },
    von: { etiqueta: "En demeure depuis (par exemple le lendemain de l'échéance)" },
    bis: { etiqueta: "Jusqu'au" },
    satz: { etiqueta: "Taux contractuel (s'il est plus élevé)", ayuda: "Laissez vide : l'intérêt moratoire légal s'applique." },
    basis: { etiqueta: "Jours d'intérêt par an", opciones: { "365": "365 jours", "360": "360 jours" } },
  },
  filas: {
    zins: { etiqueta: "Intérêt moratoire" },
    total: { etiqueta: "Montant avec intérêt moratoire" },
    tage: { etiqueta: "Jours de demeure" },
    satz: { etiqueta: "Taux d'intérêt annuel" },
  },
  ...COMUN,
});
