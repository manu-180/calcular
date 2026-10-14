import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosFr: TextosUi<UiRendimientoInversion> = {
  slug: "calcul-roi",
  ui: () => ({
    inicial: "Montant investi",
    final: "Valeur finale",
    finalAyuda: "Ce que vaut l’investissement aujourd’hui, ou ce que vous avez touché en le revendant.",
    cobrado: "Revenus perçus en cours de route (facultatif)",
    cobradoAyuda: "Dividendes, intérêts ou loyers encaissés et non réinvestis.",
    anios: "Durée de détention en années",
    aniosAyuda: "Les décimales sont acceptées pour une partie d’année, par exemple un an et demi.",
    ganancia: "Gain",
    roi: "Rendement total (ROI)",
    cagr: "Rendement annuel (TCAC)",
    cagrAyuda: "Le rendement annuel qui donne le même résultat s’il se répète et se capitalise chaque année.",
    errorInicial: "Saisissez le montant investi au départ.",
    observacionCorto: "Sur moins d’un an, le rendement annuel étire un résultat court comme s’il se répétait toute l’année. À lire avec prudence.",
    observacionInflacion: "Pour savoir si vous avez gagné du pouvoir d’achat, comparez le rendement annuel à l’inflation sur la même période.",
  }),
};
