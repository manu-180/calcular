import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosFr: TextosUi<UiTasaEfectiva> = {
  slug: "taux-nominal-taux-effectif",
  ui: () => ({
    direccion: "Quel taux avez-vous ?",
    nominalAEfectiva: "Le taux nominal (le convertir en taux effectif)",
    efectivaANominal: "Le taux effectif (le convertir en taux nominal)",
    tasa: "Taux annuel (%)",
    tasaAyuda: "Saisissez-le tel qu’il figure sur l’offre ou le contrat.",
    capitalizacion: "Capitalisation",
    capitalizacionAyuda: "La fréquence à laquelle les intérêts s’ajoutent au capital. Les prêts et cartes de crédit sont en général capitalisés chaque mois.",
    mensual: "Mensuelle (12 fois par an)",
    trimestral: "Trimestrielle (4 fois par an)",
    semestral: "Semestrielle (2 fois par an)",
    diaria: "Quotidienne (365 fois par an)",
    efectiva: "Taux effectif annuel",
    nominal: "Taux nominal annuel",
    periodica: "Taux par période",
    errorNegativa: "Le taux ne peut pas être négatif. Saisissez un nombre à partir de 0.",
    observacionDiferencia: (puntos) => `Le taux effectif dépasse le taux nominal de ${puntos} points, car les intérêts produisent eux aussi des intérêts.`,
  }),
};
