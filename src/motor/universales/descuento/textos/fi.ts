import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosFi: TextosUi<UiDescuento> = {
  slug: "alennuslaskuri",
  ui: () => ({
    precio: "Normaalihinta",
    descuento: "Alennus (%)",
    segundoDescuento: "Lisäalennus (%)",
    segundoDescuentoAyuda: "Jos saat alennetusta hinnasta vielä lisäalennuksen, syötä se tähän.",
    ahorro: "Säästät",
    final: "Alennettu hinta",
    descuentoTotal: "Alennus yhteensä",
    errorMayorA100: "Alennus ei voi olla yli 100 %.",
    observacionDoble: (efectivo) => `Kahta peräkkäistä alennusta ei lasketa suoraan yhteen. Yhteensä säästät ${efectivo} %.`,
  }),
};
