import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosBg: TextosUi<UiDividirGastos> = {
  slug: "razdelyane-na-smetka",
  ui: () => ({
    persona: (n) => `Човек ${n}`,
    personaAyuda: "Въведете колко е платил всеки. Ако някой не е платил нищо, но участва в разхода, въведете 0. Останалите полета оставете празни.",
    total: "Общ разход",
    personas: "Брой хора",
    cuota: "Дял на човек",
    transferencias: "Плащания за изравняване",
    tabla: "Кой на кого плаща",
    colDe: "Плаща",
    colPara: "Получава",
    colMonto: "Сума",
    errorPocas: "За да разделите разход, са нужни поне двама души.",
    aMano: "Сметките са чисти: всички са платили еднакво.",
  }),
};
