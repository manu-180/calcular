import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

// Taiwán llama 營業稅 a su impuesto al consumo; China continental, 增值税. Hong Kong no tiene.
export const textosZh: TextosUi<UiIva> = textosPorEscritura<UiIva>(
  "vat",
  () => ({
    operacion: "您想做什麼？",
    agregar: "未稅價格加上營業稅",
    quitar: "從含稅價格扣掉營業稅",
    monto: "價格",
    montoAyuda: "要加稅就填未稅價格，要扣稅就填含稅價格。",
    otraTasa: "其他稅率（%）",
    otraTasaAyuda: "選填。如果商品適用不同稅率，請填在這裡；否則使用一般稅率。",
    neto: "未稅價格",
    impuesto: "營業稅額",
    total: "含稅價格",
    tasaUsada: "適用稅率",
    errorTasa: "稅率不正確。",
  }),
  () => ({
    operacion: "您想做什么？",
    agregar: "不含税价格加上增值税",
    quitar: "从含税价格扣除增值税",
    monto: "价格",
    montoAyuda: "要加税就填不含税价格，要扣税就填含税价格。",
    otraTasa: "其他税率（%）",
    otraTasaAyuda: "选填。如果商品适用不同税率，请填在这里；否则使用标准税率。",
    neto: "不含税价格",
    impuesto: "增值税额",
    total: "含税价格",
    tasaUsada: "适用税率",
    errorTasa: "税率不正确。",
  }),
);
