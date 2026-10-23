import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosZh: TextosUi<UiMetaDeAhorro> = textosPorEscritura<UiMetaDeAhorro>(
  "savings-goal",
  () => ({
    meta: "您想存多少錢？",
    actual: "已經存下的金額（選填）",
    meses: "達成目標的月數",
    rendimiento: "存款年報酬率（%，選填）",
    rendimientoAyuda: "如果錢放在有利息的帳戶或投資裡就填寫；沒有利息就留空。",
    aporteMensual: "每月要存",
    aporteSemanal: "換算成每週",
    totalAportado: "自己存入的總額",
    intereses: "賺到的利息",
    errorMeta: "請輸入您想存的金額。",
    yaLlegas: "光靠現有的存款，在這段期間內就能達到目標，不必再存。",
  }),
  () => ({
    meta: "您想存多少钱？",
    actual: "已经存下的金额（选填）",
    meses: "实现目标的月数",
    rendimiento: "存款年收益率（%，选填）",
    rendimientoAyuda: "如果钱放在有利息的账户或理财里就填写；没有利息就留空。",
    aporteMensual: "每月要存",
    aporteSemanal: "换算成每周",
    totalAportado: "自己存入的总额",
    intereses: "获得的利息",
    errorMeta: "请输入您想存的金额。",
    yaLlegas: "光靠现有的存款，在这段期间内就能实现目标，不用再存。",
  }),
);
