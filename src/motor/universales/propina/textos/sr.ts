import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosSr: TextosUi<UiPropina> = {
  slug: "kalkulator-napojnice",
  ui: () => ({
    cuenta: "Iznos računa",
    porcentaje: "Napojnica (%)",
    porcentajeAyuda: "Običaji se razlikuju od zemlje do zemlje i od lokala do lokala. Izaberite iznos koji vam deluje primereno.",
    personas: "Broj osoba koje plaćaju",
    redondear: "Zaokruživanje dela svake osobe naviše",
    redondearAyuda: "Da bi svako platio okrugao iznos. Razlika ide u napojnicu.",
    propina: "Napojnica",
    total: "Ukupno sa napojnicom",
    porPersona: "Po osobi",
    propinaEfectiva: "Napojnica posle zaokruživanja",
    errorPersonas: "Plaća najmanje jedna osoba.",
    observacionRedondeo: (efectiva) => `Posle zaokruživanja naviše napojnica iznosi ${efectiva}% računa.`,
  }),
};
