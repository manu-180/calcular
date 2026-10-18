import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosZh: TextosUi<UiDividirGastos> = textosPorEscritura<UiDividirGastos>(
  "split-bill",
  () => ({
    persona: (n) => `第 ${n} 人`,
    personaAyuda: "填入每個人實際付了多少。沒付錢但要分攤的人填 0，其餘欄位留空即可。",
    total: "總花費",
    personas: "人數",
    cuota: "每人應分攤",
    transferencias: "結清所需的轉帳",
    tabla: "誰付給誰",
    colDe: "付款人",
    colPara: "收款人",
    colMonto: "金額",
    errorPocas: "至少要兩個人才能分攤費用。",
    aMano: "不用找錢：每個人付的金額都一樣。",
  }),
  () => ({
    persona: (n) => `第 ${n} 人`,
    personaAyuda: "填入每个人实际付了多少。没付钱但要分摊的人填 0，其余栏目留空即可。",
    total: "总花费",
    personas: "人数",
    cuota: "每人应分摊",
    transferencias: "结清所需的转账",
    tabla: "谁付给谁",
    colDe: "付款人",
    colPara: "收款人",
    colMonto: "金额",
    errorPocas: "至少要两个人才能分摊费用。",
    aMano: "不用找钱：每个人付的金额都一样。",
  }),
);
