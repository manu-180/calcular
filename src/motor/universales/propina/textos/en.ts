import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosEn: TextosUi<UiPropina> = {
  slug: "tip",
  ui: () => ({
    cuenta: "Bill amount",
    porcentaje: "Tip (%)",
    porcentajeAyuda: "Customs vary by country and by place. Pick what feels right to you.",
    personas: "Number of people paying",
    redondear: "Round each share up",
    redondearAyuda: "So everyone pays a whole amount. The extra goes to the tip.",
    propina: "Tip",
    total: "Total with tip",
    porPersona: "Each person pays",
    propinaEfectiva: "Tip after rounding",
    errorPersonas: "At least one person has to pay.",
    observacionRedondeo: (efectiva) => `After rounding up, the tip is ${efectiva}% of the bill.`,
  }),
};
