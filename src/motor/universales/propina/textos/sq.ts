import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosSq: TextosUi<UiPropina> = {
  slug: "kalkulator-bakshishi",
  ui: () => ({
    cuenta: "Vlera e faturës",
    porcentaje: "Bakshish (%)",
    porcentajeAyuda: "Zakonet ndryshojnë nga një vend në tjetrin dhe nga një lokal në tjetrin. Zgjidhni atë që ju duket e përshtatshme.",
    personas: "Numri i personave që paguajnë",
    redondear: "Rrumbullakosni lart pjesën e secilit",
    redondearAyuda: "Kështu secili paguan një shumë të rrumbullakët. Diferenca i shtohet bakshishit.",
    propina: "Bakshishi",
    total: "Totali me bakshish",
    porPersona: "Secili paguan",
    propinaEfectiva: "Bakshishi pas rrumbullakimit",
    errorPersonas: "Duhet të paguajë të paktën një person.",
    observacionRedondeo: (efectiva) => `Pas rrumbullakimit, bakshishi është ${efectiva}% e faturës.`,
  }),
};
