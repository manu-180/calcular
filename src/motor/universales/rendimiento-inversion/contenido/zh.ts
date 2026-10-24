import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    const inicial = montoEjemplo(ctx, 10000);
    const final = montoEjemplo(ctx, 15000);
    return {
      h1: "投資報酬率計算機（ROI 與 CAGR）",
      title: tituloQueEntre(`投資報酬率計算機（ROI 與 CAGR）｜${ctx.nombrePais}`, `投資報酬率計算機｜${ctx.nombrePais}`, "投資報酬率計算機"),
      description: "依投入金額、現在的價值和經過的年數，算出投資的總報酬率（ROI）和年化報酬率（CAGR）。",
      intro: ["賺 50% 聽起來很棒，但 2 年賺到和 10 年賺到完全不同。要比較投資，需要看每年的報酬率。", "輸入投入金額、現在的價值和經過的年數，我們會顯示總報酬率和複利年化報酬率。"],
      comoSeCalcula: [
        "ROI ＝（最終價值 ＋ 期間收益 − 投入金額）÷ 投入金額 × 100。",
        "CAGR ＝（（最終價值 ＋ 期間收益）÷ 投入金額）的（1 ÷ 年數）次方 − 1。",
        "CAGR 是複利的年化報酬率：每年重複都能得到相同結果的比率。",
      ],
      ejemplo: [
        `投入 ${m(inicial)}，最後變成 ${m(final)}，獲利 ${m(final - inicial)}，ROI 是 ${p(roi(inicial, final))}。`,
        `如果花了 5 年，年化報酬率是 ${p(cagr(inicial, final, 5))}；如果是 2 年，則是 ${p(cagr(inicial, final, 2))}。`,
      ],
      faq: [
        { pregunta: "ROI 和 CAGR 有什麼不同？", respuesta: "ROI 是不論時間長短、相對投入金額的總獲利；CAGR 把它平均到每一年，可以比較期間不同的投資。" },
        { pregunta: "為什麼年化報酬率不是總報酬率除以年數？", respuesta: `因為每年的獲利會加進本金，一起繼續成長。5 年賺 50%，複利下是每年 ${p(cagr(1, 1.5, 5))}，不是 10%。` },
        { pregunta: "領到的股利或利息怎麼算？", respuesta: "如果領出來了，就填在「期間領到的收益」；如果再投入了，就已經包含在最終價值裡。" },
      ],
      glosario: [
        { termino: "ROI", definicion: "投資報酬率：總獲利占投入金額的百分比。" },
        { termino: "CAGR", definicion: "年均複合成長率：計入複利後的平均年報酬。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    const inicial = montoEjemplo(ctx, 10000);
    const final = montoEjemplo(ctx, 15000);
    return {
      h1: "投资回报率计算器（ROI 和 CAGR）",
      title: tituloQueEntre(`投资回报率计算器（ROI 和 CAGR）｜${ctx.nombrePais}`, `投资回报率计算器｜${ctx.nombrePais}`, "投资回报率计算器"),
      description: "根据投入金额、现在的价值和经过的年数，算出投资的总回报率（ROI）和年化收益率（CAGR）。",
      intro: ["赚 50% 听起来很棒，但 2 年赚到和 10 年赚到完全不同。要比较投资，需要看每年的收益率。", "输入投入金额、现在的价值和经过的年数，我们会显示总回报率和复利年化收益率。"],
      comoSeCalcula: [
        "ROI ＝（最终价值 ＋ 期间收益 − 投入金额）÷ 投入金额 × 100。",
        "CAGR ＝（（最终价值 ＋ 期间收益）÷ 投入金额）的（1 ÷ 年数）次方 − 1。",
        "CAGR 是复利的年化收益率：每年重复都能得到相同结果的比率。",
      ],
      ejemplo: [
        `投入 ${m(inicial)}，最后变成 ${m(final)}，收益 ${m(final - inicial)}，ROI 是 ${p(roi(inicial, final))}。`,
        `如果用了 5 年，年化收益率是 ${p(cagr(inicial, final, 5))}；如果是 2 年，则是 ${p(cagr(inicial, final, 2))}。`,
      ],
      faq: [
        { pregunta: "ROI 和 CAGR 有什么不同？", respuesta: "ROI 是不论时间长短、相对投入金额的总收益；CAGR 把它平均到每一年，可以比较期限不同的投资。" },
        { pregunta: "为什么年化收益率不是总回报率除以年数？", respuesta: `因为每年的收益会计入本金，一起继续增长。5 年赚 50%，复利下是每年 ${p(cagr(1, 1.5, 5))}，不是 10%。` },
        { pregunta: "拿到的分红或利息怎么算？", respuesta: "如果取出来了，就填在“期间获得的收益”；如果再投资了，就已经包含在最终价值里。" },
      ],
      glosario: [
        { termino: "ROI", definicion: "投资回报率：总收益占投入金额的百分比。" },
        { termino: "CAGR", definicion: "复合年均增长率：计入复利后的平均年收益。" },
      ],
    };
  },
);
