import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosZh: TextosUi<UiPropina> = textosPorEscritura<UiPropina>(
  "tip",
  () => ({
    cuenta: "帳單金額",
    porcentaje: "小費（%）",
    porcentajeAyuda: "小費習慣因國家和店家而異，請選擇您覺得合適的比例。",
    personas: "分攤人數",
    redondear: "每人金額無條件進位",
    redondearAyuda: "讓每個人都付整數金額，多出來的部分算進小費。",
    propina: "小費",
    total: "含小費總額",
    porPersona: "每人應付",
    propinaEfectiva: "進位後的小費",
    errorPersonas: "至少要有一個人付款。",
    observacionRedondeo: (efectiva) => `進位之後，小費是帳單的 ${efectiva}%。`,
  }),
  () => ({
    cuenta: "账单金额",
    porcentaje: "小费（%）",
    porcentajeAyuda: "小费习惯因国家和商家而异，请选择您觉得合适的比例。",
    personas: "分摊人数",
    redondear: "每人金额向上取整",
    redondearAyuda: "让每个人都付整数金额，多出来的部分算进小费。",
    propina: "小费",
    total: "含小费总额",
    porPersona: "每人应付",
    propinaEfectiva: "取整后的小费",
    errorPersonas: "至少要有一个人付款。",
    observacionRedondeo: (efectiva) => `取整之后，小费是账单的 ${efectiva}%。`,
  }),
);
