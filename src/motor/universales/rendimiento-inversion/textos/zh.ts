import { textosPorEscritura } from "../../comun/chino";
import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosZh: TextosUi<UiRendimientoInversion> = textosPorEscritura<UiRendimientoInversion>(
  "roi",
  () => ({
    inicial: "投入金額",
    final: "最終價值",
    finalAyuda: "投資現在的價值，或賣出時拿回的金額。",
    cobrado: "期間領到的收益（選填）",
    cobradoAyuda: "沒有再投入的股利、利息或租金收入。",
    anios: "持有年數",
    aniosAyuda: "可以填小數，例如一年半就填 1.5。",
    ganancia: "獲利",
    roi: "投資報酬率（ROI）",
    cagr: "年化報酬率（CAGR）",
    cagrAyuda: "每年以複利重複、能得到相同結果的年報酬率。",
    errorInicial: "請輸入一開始投入的金額。",
    observacionCorto: "不到一年時，年化報酬率是把短期結果當成重複一整年來放大，請謹慎解讀。",
    observacionInflacion: "想知道購買力有沒有增加，請把年化報酬率和同期間的通膨率相比。",
  }),
  () => ({
    inicial: "投入金额",
    final: "最终价值",
    finalAyuda: "投资现在的价值，或者卖出时拿回的金额。",
    cobrado: "期间获得的收益（选填）",
    cobradoAyuda: "没有再投资的分红、利息或租金收入。",
    anios: "持有年数",
    aniosAyuda: "可以填小数，比如一年半就填 1.5。",
    ganancia: "收益",
    roi: "投资回报率（ROI）",
    cagr: "年化收益率（CAGR）",
    cagrAyuda: "每年按复利重复、能得到相同结果的年收益率。",
    errorInicial: "请输入一开始投入的金额。",
    observacionCorto: "不到一年时，年化收益率是把短期结果当成重复一整年来放大，请谨慎解读。",
    observacionInflacion: "想知道购买力有没有增加，请把年化收益率和同期的通胀率比较。",
  }),
);
