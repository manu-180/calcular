import { definirTextos } from "@/motor/edicion";
import ahvBeitraegeSelbststaendige from "../../ch/calculadoras/ahv-beitraege-selbststaendige";
import { COMUN } from "../lib/comun";

export default definirTextos(ahvBeitraegeSelbststaendige, {
  calculadora: "ch-fr.ahv-beitraege-selbststaendige",
  slug: "cotisations-avs-independants",
  campos: {
    einkommen: { etiqueta: "Revenu annuel de l'activité indépendante" },
  },
  filas: {
    beitrag: { etiqueta: "Cotisation AVS/AI/APG par an" },
    satz: { etiqueta: "Taux de cotisation" },
    monat: { etiqueta: "Par mois" },
  },
  ...COMUN,
});
