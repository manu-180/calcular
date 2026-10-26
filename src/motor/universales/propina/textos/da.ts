import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosDa: TextosUi<UiPropina> = {
  slug: "drikkepenge",
  ui: () => ({
    cuenta: "Regningens beløb",
    porcentaje: "Drikkepenge (%)",
    porcentajeAyuda: "Skikken er forskellig fra land til land og fra sted til sted. Vælg det, der føles rimeligt for dig.",
    personas: "Antal personer, der betaler",
    redondear: "Rund hver andel op",
    redondearAyuda: "Så alle betaler et rundt beløb. Det, der bliver tilovers, går til drikkepenge.",
    propina: "Drikkepenge",
    total: "I alt med drikkepenge",
    porPersona: "Hver person betaler",
    propinaEfectiva: "Drikkepenge efter oprunding",
    errorPersonas: "Mindst én person skal betale.",
    observacionRedondeo: (efectiva) => `Efter oprundingen er drikkepengene ${efectiva} % af regningen.`,
  }),
};
