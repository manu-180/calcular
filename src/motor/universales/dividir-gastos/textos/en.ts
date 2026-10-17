import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosEn: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `Person ${n}`,
    personaAyuda: "Enter what each person paid. If someone paid nothing but shares the cost, enter 0. Leave the rest blank.",
    total: "Total spent",
    personas: "People",
    cuota: "Each person's share",
    transferencias: "Payments to settle up",
    tabla: "Who pays whom",
    colDe: "Pays",
    colPara: "Receives",
    colMonto: "Amount",
    errorPocas: "You need at least two people to split a cost.",
    aMano: "You're all square: everyone paid the same.",
  }),
};
