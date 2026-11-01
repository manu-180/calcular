import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosSq: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-rritje-page",
  ui: () => ({
    sueldo: "Paga mujore aktuale",
    sueldoAyuda: "Bruto ose neto, si të preferoni. Rezultati përdor të njëjtën bazë.",
    aumentoPorcentaje: "Rritja (%)",
    aumentoMonto: "Rritja si shumë (opsional)",
    aumentoMontoAyuda: "Nëse rritja është një shumë fikse, vendoseni këtu. Përdoret në vend të përqindjes.",
    inflacion: "Inflacioni i periudhës (%, opsional)",
    inflacionAyuda: "Inflacioni që nga rritja e fundit, për të parë nëse paga blen më shumë apo më pak se më parë.",
    sueldosAnio: "Paga në vit",
    sueldosAnioAyuda: "12 për pagën mujore. 13 ose 14 nëse merrni edhe një pagë shtesë në vit.",
    nuevo: "Paga mujore e re",
    diferenciaMensual: "Diferenca në muaj",
    diferenciaAnual: "Diferenca në vit",
    porcentaje: "Rritja në përqindje",
    real: "Rritja reale (pas inflacionit)",
    realAyuda: "Sa më shumë mund të blini me pagën e re krahasuar me të vjetrën.",
    errorSueldo: "Vendosni pagën aktuale.",
    errorSinAumento: "Vendosni rritjen në përqindje ose si shumë.",
    observacionGana: (puntos) => `Rritja e kalon inflacionin: paga blen ${puntos}% më shumë se më parë.`,
    observacionPierde: (puntos) => `Rritja mbetet nën inflacion: paga blen ${puntos}% më pak se më parë.`,
    observacionIgual: "Rritja është e barabartë me inflacionin: paga blen njësoj si më parë.",
  }),
};
