import { percento } from "../../comun/italiano";
import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

const comeNumero = (s: string) => new Intl.NumberFormat("it-IT", { maximumFractionDigits: 2 }).format(Number(s));

export const textosIt: TextosUi<UiPropina> = {
  slug: "calcolo-mancia",
  ui: () => ({
    cuenta: "Importo del conto",
    porcentaje: "Mancia (%)",
    porcentajeAyuda: "Le abitudini cambiano da paese a paese e da locale a locale. Scegli quella che ti sembra giusta.",
    personas: "Quante persone pagano",
    redondear: "Arrotonda la quota di ciascuno",
    redondearAyuda: "Così ognuno paga una cifra tonda. La differenza va in mancia.",
    propina: "Mancia",
    total: "Totale con mancia",
    porPersona: "Quota a persona",
    propinaEfectiva: "Mancia dopo l'arrotondamento",
    errorPersonas: "Deve pagare almeno una persona.",
    observacionRedondeo: (efectiva) => `Con l'arrotondamento, la mancia è ${percento(comeNumero(efectiva))} del conto.`,
  }),
};
