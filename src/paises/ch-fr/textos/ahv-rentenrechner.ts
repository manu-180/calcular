import { definirTextos } from "@/motor/edicion";
import ahvRentenrechner from "../../ch/calculadoras/ahv-rentenrechner";
import { COMUN } from "../lib/comun";

export default definirTextos(ahvRentenrechner, {
  calculadora: "ch-fr.ahv-rentenrechner",
  slug: "rente-avs",
  campos: {
    einkommen: { etiqueta: "Revenu annuel moyen déterminant", ayuda: "Moyenne des revenus revalorisés, plus les bonifications pour tâches éducatives et d'assistance. Votre caisse de compensation l'indique dans un calcul anticipé de la rente." },
    verheiratet: { etiqueta: "Marié, les deux conjoints touchent une rente de vieillesse" },
    einkommenPartner: { etiqueta: "Revenu annuel déterminant du conjoint" },
  },
  filas: {
    rente: { etiqueta: "Rente de vieillesse AVS par mois" },
    ungekuerzt: { etiqueta: "Rente avant plafonnement" },
    partner: { etiqueta: "Rente du conjoint par mois" },
    summe: { etiqueta: "Rentes du couple ensemble" },
    dreizehnte: { etiqueta: "13e rente de vieillesse en décembre" },
    jahr: { etiqueta: "Rente de vieillesse par an" },
    tabellenwert: { etiqueta: "Revenu déterminant (arrondi à la valeur de la table)" },
  },
  ...COMUN,
});
