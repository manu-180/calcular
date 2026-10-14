import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosFr: TextosUi<UiFondoDeEmergencia> = {
  slug: "epargne-de-precaution",
  ui: () => ({
    gastos: "Dépenses essentielles par mois",
    gastosAyuda: "Ce que vous ne pouvez pas arrêter de payer : logement, alimentation, énergie, transport, santé et crédits.",
    meses: "Nombre de mois de dépenses à couvrir",
    mesesAyuda: "3 à 6 mois si vos revenus sont stables. Davantage s’ils varient ou si le foyer vit d’un seul revenu.",
    actual: "Ce que vous avez déjà mis de côté (facultatif)",
    aporte: "Ce que vous pouvez épargner par mois (facultatif)",
    meta: "Épargne de précaution conseillée",
    falta: "Reste à épargner",
    mesesParaLlegar: "Mois pour la constituer",
    cobertura: "Mois couverts aujourd’hui par votre épargne",
    errorGastos: "Saisissez vos dépenses essentielles sur un mois.",
    yaCubierto: "Votre épargne de précaution est complète. Ce que vous épargnez désormais peut aller à d’autres projets.",
    sinAporte: "Indiquez combien vous pouvez épargner chaque mois pour savoir combien de temps il vous faut.",
    observacionDonde: "Placez-la sur un compte à part, disponible le jour même et sans risque de perte, comme un livret d’épargne.",
  }),
};
