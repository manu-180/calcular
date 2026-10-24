import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

function datos(ctx: ContextoUniversal) {
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  return { ingreso, gastos, r: tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 }) };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { ingreso, gastos, r } = datos(ctx);
    return {
      h1: "接案報價計算機",
      title: tituloQueEntre(`接案時薪計算機｜${ctx.nombrePais}`, "接案時薪計算機"),
      description: "依您想落袋的金額、支出、稅費、休假和可計費時數，算出接案的時薪和日薪該收多少。",
      intro: ["接案最常見的錯誤，是拿上班時想要的月薪除以 160 小時。這樣漏掉了稅費、支出、休假和所有不能收費的時間。", "這個計算機從您想落袋的金額出發，告訴您要收多少才能達到。"],
      comoSeCalcula: ["需要的營收 ＝ 落袋金額 ÷（1 − 稅率）＋ 營運支出。", "工作天數 ＝ 52 週 × 每週工作天數 − 休息天數。", "每年可計費時數 ＝ 工作天數 × 每天可計費時數。", "時薪 ＝ 需要的營收 ÷ 每年可計費時數。"],
      ejemplo: [
        `想每年落袋 ${m(ingreso)}，支出 ${m(gastos)}、稅率 25%，需要 ${m(r.facturado)} 的營收。`,
        `休 30 天、每週可計費 25 小時，一年是 ${Math.round(r.horas)} 小時：時薪 ${m(r.hora)}，日薪 ${m(r.dia)}。`,
      ],
      faq: [
        { pregunta: "每週能計費幾小時？", respuesta: "比實際工作時數少。找客戶、回信、開發票和進修都沒人付錢。40 小時中 20 到 30 小時很常見。" },
        { pregunta: "要按時計費還是按案計費？", respuesta: "兩種都可以。就算按案報價，也先估算要花多少時間再乘上這個時薪，才不會做虧本生意。" },
        { pregunta: "稅率該填多少？", respuesta: "依所在地和您的登記方式而定，請把所得稅和保險費一起算進去。不確定的話，請問會計師。" },
      ],
      glosario: [
        { termino: "可計費時數", definicion: "可以向客戶收費的工作時數。" },
        { termino: "落袋金額", definicion: "扣除稅費和營運支出後剩下的錢。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { ingreso, gastos, r } = datos(ctx);
    return {
      h1: "自由职业报价计算器",
      title: tituloQueEntre(`自由职业时薪计算器｜${ctx.nombrePais}`, "自由职业时薪计算器"),
      description: "根据您想到手的金额、支出、税费、休假和可计费小时数，算出做自由职业时薪和日薪该收多少。",
      intro: ["自由职业最常见的错误，是拿上班时想要的月薪除以 160 小时。这样漏掉了税费、支出、休假和所有不能收费的时间。", "这个计算器从您想到手的金额出发，告诉您要收多少才能达到。"],
      comoSeCalcula: ["需要的收入 ＝ 到手金额 ÷（1 − 税率）＋ 经营支出。", "工作天数 ＝ 52 周 × 每周工作天数 − 休息天数。", "每年可计费小时数 ＝ 工作天数 × 每天可计费小时数。", "时薪 ＝ 需要的收入 ÷ 每年可计费小时数。"],
      ejemplo: [
        `想每年到手 ${m(ingreso)}，支出 ${m(gastos)}、税率 25%，需要 ${m(r.facturado)} 的收入。`,
        `休 30 天、每周可计费 25 小时，一年是 ${Math.round(r.horas)} 小时：时薪 ${m(r.hora)}，日薪 ${m(r.dia)}。`,
      ],
      faq: [
        { pregunta: "每周能计费几小时？", respuesta: "比实际工作时间少。找客户、回邮件、开发票和学习都没人付钱。40 小时中 20 到 30 小时很常见。" },
        { pregunta: "按小时收费还是按项目收费？", respuesta: "两种都可以。就算按项目报价，也先估算要花多少时间再乘以这个时薪，才不会做亏本生意。" },
        { pregunta: "税率该填多少？", respuesta: "取决于所在地和您的经营方式，请把个税和社保一起算进去。不确定的话，请咨询会计。" },
      ],
      glosario: [
        { termino: "可计费小时", definicion: "可以向客户收费的工作时间。" },
        { termino: "到手金额", definicion: "扣除税费和经营支出后剩下的钱。" },
      ],
    };
  },
);
