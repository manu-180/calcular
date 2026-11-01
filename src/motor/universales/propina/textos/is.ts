import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosIs: TextosUi<UiPropina> = {
  slug: "thjorfe",
  ui: () => ({
    cuenta: "Upphæð reiknings",
    porcentaje: "Þjórfé (%)",
    porcentajeAyuda: "Siðirnir eru misjafnir eftir löndum og stöðum. Veldu það sem þér finnst sanngjarnt.",
    personas: "Fjöldi sem borgar",
    redondear: "Námunda hlut hvers og eins upp",
    redondearAyuda: "Svo allir borgi slétta upphæð. Afgangurinn fer í þjórfé.",
    propina: "Þjórfé",
    total: "Samtals með þjórfé",
    porPersona: "Hver og einn borgar",
    propinaEfectiva: "Þjórfé eftir námundun",
    errorPersonas: "Að minnsta kosti einn þarf að borga.",
    observacionRedondeo: (efectiva) => `Eftir námundun upp er þjórféð ${efectiva}% af reikningnum.`,
  }),
};
