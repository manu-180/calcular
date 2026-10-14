import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosNl: TextosUi<UiPropina> = {
  slug: "fooi-berekenen",
  ui: () => ({
    cuenta: "Bedrag van de rekening",
    porcentaje: "Fooi (%)",
    porcentajeAyuda: "Wat gebruikelijk is, verschilt per land en per zaak. Kies wat voor jou goed voelt.",
    personas: "Aantal mensen dat betaalt",
    redondear: "Ieders deel naar boven afronden",
    redondearAyuda: "Zo betaalt iedereen een rond bedrag. Wat erbij komt, gaat naar de fooi.",
    propina: "Fooi",
    total: "Totaal met fooi",
    porPersona: "Ieder betaalt",
    propinaEfectiva: "Fooi na afronden",
    errorPersonas: "Er moet minstens één persoon betalen.",
    observacionRedondeo: (efectiva) => `Na het afronden is de fooi ${efectiva}% van de rekening.`,
  }),
};
