import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosZh: TextosUi<UiPresupuesto> = textosPorEscritura<UiPresupuesto>(
  "budget",
  () => ({
    ingreso: "每月實領薪資",
    ingresoAyuda: "扣掉稅金和各項保險費後，每月實際入帳的金額。",
    pctNecesidades: "必要支出（%）",
    pctNecesidadesAyuda: "房租或房貸、伙食、水電瓦斯、交通、醫療和債務的最低還款。",
    pctGustos: "想要的支出（%）",
    pctGustosAyuda: "外食、非必要購物、訂閱服務、旅行。",
    pctAhorro: "儲蓄（%）",
    pctAhorroAyuda: "緊急預備金、存錢目標、退休金和提前還債。",
    necesidades: "必要支出",
    gustos: "想要的支出",
    ahorro: "儲蓄",
    ahorroAnual: "一年的儲蓄",
    errorIngreso: "請輸入每月收入。",
    errorSuma: (suma) => `三個比例加起來是 ${suma}%，必須等於 100%。`,
    observacionAhorroBajo: "儲蓄低於 10%，應付突發狀況的空間就很小。可以的話，減少一些想要的支出。",
  }),
  () => ({
    ingreso: "每月到手收入",
    ingresoAyuda: "扣除个税和五险一金后，每月实际到账的金额。",
    pctNecesidades: "必要支出（%）",
    pctNecesidadesAyuda: "房租或房贷、伙食、水电燃气、交通、医疗和债务的最低还款。",
    pctGustos: "想要的支出（%）",
    pctGustosAyuda: "外出就餐、非必需购物、会员订阅、旅行。",
    pctAhorro: "储蓄（%）",
    pctAhorroAyuda: "应急资金、存钱目标、养老储蓄和提前还债。",
    necesidades: "必要支出",
    gustos: "想要的支出",
    ahorro: "储蓄",
    ahorroAnual: "一年的储蓄",
    errorIngreso: "请输入每月收入。",
    errorSuma: (suma) => `三个比例加起来是 ${suma}%，必须等于 100%。`,
    observacionAhorroBajo: "储蓄低于 10%，应对突发情况的空间就很小。可以的话，减少一些想要的支出。",
  }),
);
