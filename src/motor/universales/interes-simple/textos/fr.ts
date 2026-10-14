import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosFr: TextosUi<UiInteresSimple> = {
  slug: "calcul-interets-simples",
  ui: () => ({
    capital: "Capital",
    tasa: "Taux d’intérêt annuel (%)",
    tiempo: "Durée",
    unidad: "La durée est en",
    dias: "Jours",
    meses: "Mois",
    anios: "Années",
    base: "Jours dans une année (pour une durée en jours)",
    baseAyuda: "Certaines banques comptent l’année sur 360 jours. Dans le doute, laissez 365.",
    base365: "365 jours (année civile)",
    base360: "360 jours (année commerciale)",
    interes: "Intérêts",
    montoFinal: "Capital plus intérêts",
    tasaPeriodo: "Taux sur la période",
    errorCapital: "Saisissez un capital supérieur à zéro.",
  }),
};
