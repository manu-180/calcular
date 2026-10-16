import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosJa: TextosUi<UiPrestamo> = {
  slug: "loan",
  ui: () => ({
    monto: "借入額",
    tasa: "年利（%）",
    tasaAyuda: "契約書や見積もりに書かれた年利（実質年率）です。手数料は含みません。",
    meses: "返済期間（か月）",
    extra: "毎月の繰り上げ返済額（任意）",
    extraAyuda: "早く返し終えるために毎月上乗せする金額です。全額が元金の返済に回ります。",
    cuota: "毎月の返済額",
    intereses: "利息の総額",
    total: "返済総額",
    mesesReales: "繰り上げ返済した場合の返済期間（か月）",
    ahorro: "減らせる利息",
    tabla: "返済予定表",
    colMes: "回数",
    colPago: "返済額",
    colInteres: "利息",
    colCapital: "元金",
    colSaldo: "残高",
    errorMonto: "0より大きい金額を入れてください。",
    observacionCostos: "返済額には、金融機関が加える保険料、手数料、税金は含まれていません。契約前に総支払額を確認してください。",
    observacionExtra: (meses, ahorro) => `繰り上げ返済をすると${meses}か月で返し終わり、利息を${ahorro}減らせます。`,
  }),
};
