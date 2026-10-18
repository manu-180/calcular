import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosZh: TextosUi<UiInteresSimple> = textosPorEscritura<UiInteresSimple>(
  "simple-interest",
  () => ({
    capital: "本金",
    tasa: "年利率（%）",
    tiempo: "期間",
    unidad: "期間單位",
    dias: "天",
    meses: "月",
    anios: "年",
    base: "一年天數（以天計算時）",
    baseAyuda: "有些銀行一年以 360 天計算。不確定的話，保留 365。",
    base365: "365 天",
    base360: "360 天",
    interes: "利息",
    montoFinal: "本金加利息",
    tasaPeriodo: "期間利率",
    errorCapital: "請輸入大於 0 的本金。",
  }),
  () => ({
    capital: "本金",
    tasa: "年利率（%）",
    tiempo: "期限",
    unidad: "期限单位",
    dias: "天",
    meses: "月",
    anios: "年",
    base: "一年天数（按天计算时）",
    baseAyuda: "有些银行一年按 360 天计算。不确定的话，保留 365。",
    base365: "365 天",
    base360: "360 天",
    interes: "利息",
    montoFinal: "本息合计",
    tasaPeriodo: "期间利率",
    errorCapital: "请输入大于 0 的本金。",
  }),
);
