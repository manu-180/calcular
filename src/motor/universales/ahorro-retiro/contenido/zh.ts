import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

function datos(ctx: ContextoUniversal) {
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const a40 = acumular(40, 65, actual, aporte, 4);
  return { actual, aporte, capital30: a30[a30.length - 1].saldo, capital40: a40[a40.length - 1].saldo };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { actual, aporte, capital30, capital40 } = datos(ctx);
    return {
      h1: "退休金試算",
      title: tituloQueEntre(`退休金試算｜${ctx.nombrePais}`, "退休金試算"),
      description: "看看每月投入能為退休存下多少，以及這筆錢每月能提供多少收入，全部以今天的幣值計算。",
      intro: ["光靠政府的退休金，往往難以維持現在的生活水準。自己存的錢就算不多，越早開始差別越大。", "輸入年齡、想退休的年齡、現有存款和每月能投入的金額，我們會顯示退休時的存款，以及每月可以提領多少。"],
      comoSeCalcula: ["存款每月以實質報酬率（報酬率減去通膨）成長，所以結果是今天的幣值。", "退休後，存款在您選的年數內每月平均提領；剩下的錢在這段期間繼續成長。", "不含政府退休金、稅金和投資手續費。"],
      ejemplo: [
        `30 歲時有 ${m(actual)}，每月投入 ${m(aporte)}、實質報酬率 4%，65 歲時會有 ${m(capital30)}，可以連續 25 年每月提領 ${m(rentaMensual(capital30, 4, 25))}。`,
        `同樣的條件從 40 歲開始，會有 ${m(capital40)}。十年的差距非常大。`,
      ],
      faq: [
        { pregunta: "什麼是實質報酬率？", respuesta: "扣除通膨後的投資報酬。投資報酬 7%、通膨 3% 的話，實質報酬率大約是 4%。" },
        { pregunta: "這可以取代政府的退休金嗎？", respuesta: "不行。這是在政府或公司退休金之外，您自己的儲蓄。政府退休金的預估金額，請向您所在地的主管機關查詢。" },
        { pregunta: "退休要存多少才夠？", respuesta: "沒有標準答案。常見的參考是收入的 10% 到 15%。最重要的是盡早開始。" },
      ],
      glosario: [
        { termino: "實質報酬率", definicion: "超過通膨的那部分投資報酬。" },
        { termino: "今天的幣值", definicion: "把未來的金額換算成今天能買到多少東西。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { actual, aporte, capital30, capital40 } = datos(ctx);
    return {
      h1: "养老储蓄计算器",
      title: tituloQueEntre(`养老储蓄计算器｜${ctx.nombrePais}`, "养老储蓄计算器"),
      description: "看看每月投入能为退休存下多少，以及这笔钱每月能提供多少收入，全部按今天的购买力计算。",
      intro: ["光靠基本养老金，往往难以维持现在的生活水平。自己存的钱哪怕不多，越早开始差别越大。", "输入年龄、想退休的年龄、现有存款和每月能投入的金额，我们会显示退休时的存款，以及每月可以支取多少。"],
      comoSeCalcula: ["存款每月按实际收益率（收益率减去通胀）增长，所以结果是按今天的购买力计算的。", "退休后，存款在您选的年数内每月平均支取；剩下的钱在这段期间继续增长。", "不含基本养老金、税费和投资手续费。"],
      ejemplo: [
        `30 岁时有 ${m(actual)}，每月投入 ${m(aporte)}、实际收益率 4%，65 岁时会有 ${m(capital30)}，可以连续 25 年每月支取 ${m(rentaMensual(capital30, 4, 25))}。`,
        `同样的条件从 40 岁开始，会有 ${m(capital40)}。十年的差距非常大。`,
      ],
      faq: [
        { pregunta: "什么是实际收益率？", respuesta: "扣除通胀后的投资收益。投资收益 7%、通胀 3% 的话，实际收益率大约是 4%。" },
        { pregunta: "这能代替基本养老金吗？", respuesta: "不能。这是在基本养老金或企业年金之外，您自己的储蓄。养老金的预估金额，请向当地社保机构查询。" },
        { pregunta: "退休要存多少才够？", respuesta: "没有标准答案。常见的参考是收入的 10% 到 15%。最重要的是尽早开始。" },
      ],
      glosario: [
        { termino: "实际收益率", definicion: "超过通胀的那部分投资收益。" },
        { termino: "今天的购买力", definicion: "把未来的金额换算成今天能买到多少东西。" },
      ],
    };
  },
);
