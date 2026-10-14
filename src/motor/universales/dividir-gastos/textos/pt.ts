import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosPt: TextosUi<UiDividirGastos> = {
  slug: "dividir-contas",
  ui: () => ({
    persona: (n) => `Pessoa ${n}`,
    personaAyuda: "Coloque quanto cada um pagou. Se alguém não pagou nada mas entra na divisão, coloque 0. Deixe o resto em branco.",
    total: "Total gasto",
    personas: "Pessoas",
    cuota: "Parte de cada um",
    transferencias: "Pagamentos para acertar as contas",
    tabla: "Quem paga para quem",
    colDe: "Paga",
    colPara: "Recebe",
    colMonto: "Valor",
    errorPocas: "Para dividir uma conta são precisas pelo menos duas pessoas.",
    aMano: "Ninguém deve nada: todos pagaram o mesmo.",
  }),
};
