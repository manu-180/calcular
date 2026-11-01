import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosBs: TextosUi<UiPropina> = {
  slug: "kalkulator-baksisa",
  ui: () => ({
    cuenta: "Iznos računa",
    porcentaje: "Bakšiš (%)",
    porcentajeAyuda: "Običaji se razlikuju od zemlje do zemlje i od lokala do lokala. Izaberite iznos koji vam se čini primjerenim.",
    personas: "Broj osoba koje plaćaju",
    redondear: "Zaokruživanje dijela svake osobe naviše",
    redondearAyuda: "Da bi svako platio okrugao iznos. Razlika ide u bakšiš.",
    propina: "Bakšiš",
    total: "Ukupno s bakšišom",
    porPersona: "Po osobi",
    propinaEfectiva: "Bakšiš nakon zaokruživanja",
    errorPersonas: "Plaća najmanje jedna osoba.",
    observacionRedondeo: (efectiva) => `Nakon zaokruživanja naviše bakšiš iznosi ${efectiva} % računa.`,
  }),
};
