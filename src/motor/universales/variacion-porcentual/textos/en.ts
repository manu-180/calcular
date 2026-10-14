import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosEn: TextosUi<UiVariacion> = {
  slug: "percentage-change",
  ui: () => ({
    inicial: "Starting value",
    final: "Final value",
    variacion: "Percentage change",
    diferencia: "Difference",
    vuelta: "To get back to the start",
    vueltaAyuda: "How much the final value would have to change to return to the starting value.",
    errorInicialCero: "The starting value can't be 0: there is no percentage change from zero.",
    subio: (p) => `It went up ${p}%.`,
    bajo: (p) => `It went down ${p}%.`,
    igual: "No change: both values are the same.",
  }),
};
