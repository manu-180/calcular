import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

function datos(ctx: ContextoUniversal) {
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  return { capital, aporte, a10: proyectar(capital, aporte, 7, 10, "mensual")[9].saldo, a20: proyectar(capital, aporte, 7, 20, "mensual")[19].saldo };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { capital, aporte, a10, a20 } = datos(ctx);
    return {
      h1: "複利計算機",
      title: tituloQueEntre(`複利計算機（定期定額）｜${ctx.nombrePais}`, `複利計算機｜${ctx.nombrePais}`, "複利計算機"),
      description: "看看您的錢在複利和每月投入下怎麼成長：最終金額、賺到的利息，以及逐年明細表。",
      intro: ["複利是把利息加進本金，讓利息也開始生利息，所以存款會越滾越快。", "輸入現在有的錢、每月能投入多少、利率和年數，我們會顯示最終金額，以及其中有多少是利息。"],
      comoSeCalcula: [
        "最終金額 ＝ 初始金額 ×（1 ＋ i）的 n 次方 ＋ 每月投入 ×（（1 ＋ i）的 n 次方 − 1）÷ i。",
        "i 是依您選的複利頻率換算的月利率，n 是月數。",
        "每月投入在每個月月底加入。",
      ],
      ejemplo: [`從 ${m(capital)} 開始，每月投入 ${m(aporte)}、年利率 7%，10 年後會有 ${m(a10)}。`, `再持續 10 年，金額會到 ${m(a20)}。第二個十年賺的遠比第一個十年多。`],
      faq: [
        { pregunta: "單利和複利有什麼不同？", respuesta: "單利永遠只按原本的本金計息；複利則按本金加上已經賺到的利息計息。" },
        { pregunta: "什麼是 72 法則？", respuesta: "估算錢翻倍要多久的速算法：用 72 除以年利率。年利率 6% 的話，大約 12 年翻倍。" },
        { pregunta: "利率該填多少？", respuesta: "填符合您資金去處的實際利率。想看換算成今天價值的結果，就用利率減去預期通膨率。" },
      ],
      glosario: [
        { termino: "複利", definicion: "利息併入本金後，連同本金一起再計息。" },
        { termino: "定期定額", definicion: "每月固定投入一筆金額。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { capital, aporte, a10, a20 } = datos(ctx);
    return {
      h1: "复利计算器",
      title: tituloQueEntre(`复利计算器（定投）｜${ctx.nombrePais}`, `复利计算器｜${ctx.nombrePais}`, "复利计算器"),
      description: "看看您的钱在复利和每月定投下怎么增长：最终金额、获得的利息，以及逐年明细表。",
      intro: ["复利是把利息加进本金，让利息也开始生利息，所以存款会越滚越快。", "输入现在有的钱、每月能投入多少、利率和年数，我们会显示最终金额，以及其中有多少是利息。"],
      comoSeCalcula: [
        "最终金额 ＝ 初始金额 ×（1 ＋ i）的 n 次方 ＋ 每月定投 ×（（1 ＋ i）的 n 次方 − 1）÷ i。",
        "i 是按您选的复利频率换算的月利率，n 是月数。",
        "每月定投在每个月月底加入。",
      ],
      ejemplo: [`从 ${m(capital)} 开始，每月定投 ${m(aporte)}、年利率 7%，10 年后会有 ${m(a10)}。`, `再坚持 10 年，金额会到 ${m(a20)}。第二个十年赚的远比第一个十年多。`],
      faq: [
        { pregunta: "单利和复利有什么不同？", respuesta: "单利始终只按原来的本金计息；复利则按本金加上已经获得的利息计息。" },
        { pregunta: "什么是 72 法则？", respuesta: "估算钱翻倍要多久的速算法：用 72 除以年利率。年利率 6% 的话，大约 12 年翻倍。" },
        { pregunta: "利率该填多少？", respuesta: "填符合您资金去向的实际利率。想看换算成今天价值的结果，就用利率减去预期通胀率。" },
      ],
      glosario: [
        { termino: "复利", definicion: "利息计入本金后，连同本金一起再计息。" },
        { termino: "定投", definicion: "每月固定投入一笔金额。" },
      ],
    };
  },
);
