import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosJa: TextosUi<UiDividirGastos> = {
  slug: "split-bill",
  ui: () => ({
    persona: (n) => `${n}人目`,
    personaAyuda: "それぞれが払った金額を入れてください。何も払っていなくても費用を分担する人は0を入れます。使わない欄は空のままで大丈夫です。",
    total: "費用の合計",
    personas: "人数",
    cuota: "1人あたりの負担額",
    transferencias: "精算に必要な支払い",
    tabla: "誰が誰に払うか",
    colDe: "払う人",
    colPara: "受け取る人",
    colMonto: "金額",
    errorPocas: "割り勘には2人以上が必要です。",
    aMano: "精算は不要です。全員が同じ金額を払っています。",
  }),
};
