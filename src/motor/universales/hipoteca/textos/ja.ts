import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosJa: TextosUi<UiHipoteca> = {
  slug: "mortgage",
  ui: () => ({
    precio: "物件価格",
    entradaPorcentaje: "頭金（物件価格の%）",
    entradaMonto: "頭金の金額（任意）",
    entradaMontoAyuda: "入力すると、割合のかわりにこの金額を使います。",
    tasa: "年利（%）",
    anios: "返済期間（年）",
    gastos: "毎月の住居費（任意）",
    gastosAyuda: "固定資産税、火災保険、管理費など、ローンとあわせて払う費用です。",
    cuota: "毎月のローン返済額",
    cuotaTotal: "住居費を含めた毎月の支払い",
    entrada: "頭金",
    prestado: "借入額",
    intereses: "利息の総額",
    total: "ローン返済の総額",
    tabla: "年ごとの返済",
    colAnio: "年",
    colIntereses: "払った利息",
    colCapital: "返した元金",
    colSaldo: "年末の残高",
    errorPrecio: "物件価格を入れてください。",
    errorEntrada: "頭金で物件価格の全額をまかなえるため、ローンの計算はありません。頭金を減らしてください。",
    observacionPrestado: (porcentaje) => `物件価格の${porcentaje}%を借りることになります。この割合が高いほど、金融機関の審査は厳しくなるのが一般的です。`,
    observacionCostos: "登記費用、税金、仲介手数料などの諸費用は含まれていません。頭金とは別に用意しておきましょう。",
  }),
};
