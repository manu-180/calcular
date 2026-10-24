import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const gastos = montoEjemplo(ctx, 1500);
    const aporte = montoEjemplo(ctx, 300);
    return {
      h1: "緊急預備金計算機",
      title: tituloQueEntre(`緊急預備金計算機｜${ctx.nombrePais}`, "緊急預備金計算機"),
      description: "依每月必要開銷算出緊急預備金該有多少，以及用每月能存的錢要幾個月才能存滿。",
      intro: ["緊急預備金是為無法預料的事準備的錢：失業、生病或家裡急需修繕。", "有了它，最難熬的時候就不必靠刷卡度日。輸入每月必要開銷，以及想準備幾個月。"],
      comoSeCalcula: ["建議預備金 ＝ 每月必要開銷 × 要準備的月數。", "還要存 ＝ 建議預備金 − 已經準備的金額。", "存滿所需月數 ＝ 還要存 ÷ 每月能存的錢，無條件進位。"],
      ejemplo: [`每月必要開銷 ${m(gastos)}，6 個月的預備金就是 ${m(gastos * 6)}。`, `每月存 ${m(aporte)}，${Math.ceil((gastos * 6) / aporte)} 個月就能存滿。`],
      faq: [
        { pregunta: "緊急預備金要準備幾個月？", respuesta: "一般建議 3 到 6 個月的必要開銷。如果收入不固定、自己接案，或家裡只有一份收入，目標放在 6 到 12 個月。" },
        { pregunta: "緊急預備金要放在哪裡？", respuesta: "放在安全、當天就能領出、和日常花用分開的帳戶。它不是拿來冒險投資的，任務是需要時一定在。" },
        { pregunta: "先存預備金還是先還債？", respuesta: "常見的做法是先存一個月的開銷，接著還清信用卡等高利率債務，最後再把預備金存滿。" },
      ],
      glosario: [
        { termino: "必要開銷", definicion: "就算沒有收入也必須付的支出：住、吃、水電、醫療。" },
        { termino: "流動性", definicion: "錢能多快拿來用，而且不會虧損。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const gastos = montoEjemplo(ctx, 1500);
    const aporte = montoEjemplo(ctx, 300);
    return {
      h1: "应急资金计算器",
      title: tituloQueEntre(`应急资金计算器｜${ctx.nombrePais}`, "应急资金计算器"),
      description: "根据每月必要开销算出应急资金该有多少，以及用每月能存的钱要几个月才能存满。",
      intro: ["应急资金是为无法预料的事准备的钱：失业、生病或家里急需维修。", "有了它，最难熬的时候就不必靠刷信用卡度日。输入每月必要开销，以及想准备几个月。"],
      comoSeCalcula: ["建议应急资金 ＝ 每月必要开销 × 要准备的月数。", "还要存 ＝ 建议应急资金 − 已经准备的金额。", "存满所需月数 ＝ 还要存 ÷ 每月能存的钱，向上取整。"],
      ejemplo: [`每月必要开销 ${m(gastos)}，6 个月的应急资金就是 ${m(gastos * 6)}。`, `每月存 ${m(aporte)}，${Math.ceil((gastos * 6) / aporte)} 个月就能存满。`],
      faq: [
        { pregunta: "应急资金要准备几个月？", respuesta: "一般建议 3 到 6 个月的必要开销。如果收入不固定、自由职业，或家里只有一份收入，目标定在 6 到 12 个月。" },
        { pregunta: "应急资金要放在哪里？", respuesta: "放在安全、当天就能取出、和日常开销分开的账户。它不是用来冒险投资的，任务是需要时一定在。" },
        { pregunta: "先存应急资金还是先还债？", respuesta: "常见的做法是先存一个月的开销，接着还清信用卡等高利率债务，最后再把应急资金存满。" },
      ],
      glosario: [
        { termino: "必要开销", definicion: "就算没有收入也必须付的支出：住、吃、水电、医疗。" },
        { termino: "流动性", definicion: "钱能多快拿来用，而且不会亏损。" },
      ],
    };
  },
);
