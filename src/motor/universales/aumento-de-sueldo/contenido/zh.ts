import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    const sueldo = montoEjemplo(ctx, 4000);
    return {
      h1: "調薪計算機",
      title: tituloQueEntre(`調薪計算機｜${ctx.nombrePais}`, "調薪計算機"),
      description: "算出調薪後的月薪、每月和每年的差額，以及扣掉通膨後的實質調薪，看看您是否贏過通膨。",
      intro: ["公司提出調薪，或您正準備開口爭取？輸入薪水和調幅（百分比或金額），看看每月、每年差多少。", "再加上期間內的通膨率，我們會告訴您購買力是真的提高，還是只是追平。"],
      comoSeCalcula: ["調薪後月薪 ＝ 目前月薪 ×（1 ＋ 調幅 ÷ 100）。", "每年差額 ＝ 每月差額 × 每年領薪次數。", "實質調薪 ＝（1 ＋ 調幅）÷（1 ＋ 通膨率）− 1。"],
      ejemplo: [
        `月薪 ${m(sueldo)} 調薪 5%，變成 ${m(sueldo * 1.05)}：每月多 ${m(sueldo * 0.05)}，每年多 ${m(sueldo * 0.05 * 12)}。`,
        `如果期間通膨是 3%，實質調薪是 ${p(aumentoReal(5, 3))}；通膨 6% 的話，是 ${p(aumentoReal(5, 6))}。`,
      ],
      faq: [
        { pregunta: "什麼是實質調薪？", respuesta: "扣除通膨後的調薪幅度，看得出新薪水能比以前多買還是少買。" },
        { pregunta: "為什麼不能直接用調幅減通膨？", respuesta: `因為兩個百分比是相乘，不是相加減。調薪 5%、通膨 3%，實質調薪是 ${p(aumentoReal(5, 3))}，不是 2%。通膨越高，差距越大。` },
        { pregunta: "調薪該爭取多少？", respuesta: "至少要有上次調薪以來的通膨，才不會實質減薪。再往上，可以參考同類職位的行情，以及您工作內容的成長。" },
      ],
      glosario: [
        { termino: "名目調薪", definicion: "薪資單上看到的調幅，尚未考慮通膨。" },
        { termino: "購買力", definicion: "薪水能買到的東西。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
    const sueldo = montoEjemplo(ctx, 4000);
    return {
      h1: "涨薪计算器",
      title: tituloQueEntre(`涨薪计算器｜${ctx.nombrePais}`, "涨薪计算器"),
      description: "算出涨薪后的月薪、每月和每年的差额，以及扣除通胀后的实际涨幅，看看您是否跑赢了通胀。",
      intro: ["公司给您涨薪，或者您正准备去谈？输入工资和涨幅（百分比或金额），看看每月、每年差多少。", "再加上期间内的通胀率，我们会告诉您购买力是真的提高了，还是只是持平。"],
      comoSeCalcula: ["涨薪后月薪 ＝ 目前月薪 ×（1 ＋ 涨幅 ÷ 100）。", "每年差额 ＝ 每月差额 × 每年发薪次数。", "实际涨幅 ＝（1 ＋ 涨幅）÷（1 ＋ 通胀率）− 1。"],
      ejemplo: [
        `月薪 ${m(sueldo)} 涨薪 5%，变成 ${m(sueldo * 1.05)}：每月多 ${m(sueldo * 0.05)}，每年多 ${m(sueldo * 0.05 * 12)}。`,
        `如果期间通胀是 3%，实际涨幅是 ${p(aumentoReal(5, 3))}；通胀 6% 的话，是 ${p(aumentoReal(5, 6))}。`,
      ],
      faq: [
        { pregunta: "什么是实际涨幅？", respuesta: "扣除通胀后的涨薪幅度，能看出新工资比以前多买还是少买。" },
        { pregunta: "为什么不能直接用涨幅减通胀？", respuesta: `因为两个百分比是相乘，不是相加减。涨薪 5%、通胀 3%，实际涨幅是 ${p(aumentoReal(5, 3))}，不是 2%。通胀越高，差距越大。` },
        { pregunta: "涨薪该争取多少？", respuesta: "至少要覆盖上次涨薪以来的通胀，才不会实际降薪。再往上，可以参考同类岗位的市场行情，以及您工作内容的增长。" },
      ],
      glosario: [
        { termino: "名义涨薪", definicion: "工资条上看到的涨幅，尚未考虑通胀。" },
        { termino: "购买力", definicion: "工资能买到的东西。" },
      ],
    };
  },
);
