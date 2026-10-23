import { esHongKong, textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

// Hong Kong dice 按揭 y 首期 donde Taiwán dice 房貸 y 頭期款.
export const textosZh: TextosUi<UiHipoteca> = textosPorEscritura<UiHipoteca>(
  "mortgage",
  (locale) => {
    const hk = esHongKong(locale);
    const prestamo = hk ? "按揭" : "房貸";
    const entrada = hk ? "首期" : "頭期款";
    return {
      precio: "房屋總價",
      entradaPorcentaje: `${entrada}（占總價 %）`,
      entradaMonto: `${entrada}金額（選填）`,
      entradaMontoAyuda: "填了金額就會用它取代百分比。",
      tasa: "年利率（%）",
      anios: "貸款年期",
      gastos: "每月居住費用（選填）",
      gastosAyuda: hk ? "差餉、地租、家居保險或管理費等和按揭一起付的費用。" : "房屋稅、地價稅、住宅保險或管理費等和房貸一起付的費用。",
      cuota: `每月${prestamo}還款`,
      cuotaTotal: "含居住費用的每月支出",
      entrada,
      prestado: "貸款金額",
      intereses: "利息總額",
      total: `${prestamo}還款總額`,
      tabla: "逐年明細",
      colAnio: "年度",
      colIntereses: "已付利息",
      colCapital: "已還本金",
      colSaldo: "年底剩餘本金",
      errorPrecio: "請輸入房屋總價。",
      errorEntrada: `${entrada}已經涵蓋全部房價，沒有${prestamo}可算。請降低${entrada}。`,
      observacionPrestado: (porcentaje) => `您借的是房屋價值的 ${porcentaje}%。這個比例越高，銀行的審核條件通常越嚴格。`,
      observacionCostos: hk ? "未包含印花稅、律師費和代理佣金等置業雜費，請在首期以外另外預留。" : "未包含契稅、代書費和仲介費等購屋雜費，請在頭期款以外另外預留。",
    };
  },
  () => ({
    precio: "房屋总价",
    entradaPorcentaje: "首付（占总价 %）",
    entradaMonto: "首付金额（选填）",
    entradaMontoAyuda: "填了金额就会用它代替百分比。",
    tasa: "年利率（%）",
    anios: "贷款年限",
    gastos: "每月居住费用（选填）",
    gastosAyuda: "物业费、房屋保险等和房贷一起付的费用。",
    cuota: "房贷月供",
    cuotaTotal: "含居住费用的每月支出",
    entrada: "首付",
    prestado: "贷款金额",
    intereses: "利息总额",
    total: "房贷还款总额",
    tabla: "逐年明细",
    colAnio: "年度",
    colIntereses: "已付利息",
    colCapital: "已还本金",
    colSaldo: "年末剩余本金",
    errorPrecio: "请输入房屋总价。",
    errorEntrada: "首付已经覆盖全部房价，没有房贷可算。请降低首付。",
    observacionPrestado: (porcentaje) => `您借的是房屋价值的 ${porcentaje}%。这个比例越高，银行的审批条件通常越严格。`,
    observacionCostos: "未包含契税、中介费等购房杂费，请在首付之外另行预留。",
  }),
);
