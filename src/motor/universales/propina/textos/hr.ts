import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosHr: TextosUi<UiPropina> = {
  slug: "kalkulator-napojnice",
  ui: () => ({
    cuenta: "Iznos računa",
    porcentaje: "Napojnica (%)",
    porcentajeAyuda: "Običaji se razlikuju od zemlje do zemlje i od lokala do lokala. Odaberite iznos koji vam se čini primjerenim.",
    personas: "Broj osoba koje plaćaju",
    redondear: "Zaokruživanje dijela svake osobe naviše",
    redondearAyuda: "Da bi svatko platio okrugao iznos. Razlika ide u napojnicu.",
    propina: "Napojnica",
    total: "Ukupno s napojnicom",
    porPersona: "Po osobi",
    propinaEfectiva: "Napojnica nakon zaokruživanja",
    errorPersonas: "Plaća najmanje jedna osoba.",
    observacionRedondeo: (efectiva) => `Nakon zaokruživanja naviše napojnica iznosi ${efectiva} % računa.`,
  }),
};
