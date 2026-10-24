import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosNb: TextosUi<UiPropina> = {
  slug: "tipskalkulator",
  ui: () => ({
    cuenta: "Beløp på regningen",
    porcentaje: "Tips (%)",
    porcentajeAyuda: "Skikken varierer mellom land og steder. Tips er ofte frivillig, så velg det som føles riktig for deg.",
    personas: "Antall som betaler",
    redondear: "Rund av hver andel oppover",
    redondearAyuda: "Slik at alle betaler et rundt beløp. Det som blir til overs, går til tips.",
    propina: "Tips",
    total: "Totalt med tips",
    porPersona: "Hver betaler",
    propinaEfectiva: "Tips etter avrunding",
    errorPersonas: "Minst én person må betale.",
    observacionRedondeo: (efectiva) => `Etter avrunding oppover er tipset ${efectiva} % av regningen.`,
  }),
};
