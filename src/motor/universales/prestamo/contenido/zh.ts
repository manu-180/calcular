import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const monto = montoEjemplo(ctx, 10000);
    return {
      h1: "貸款試算",
      title: tituloQueEntre(`貸款試算（每月還款與利息）｜${ctx.nombrePais}`, `貸款試算｜${ctx.nombrePais}`, "貸款試算"),
      description: "算出貸款每月要還多少、利息總額和完整的還款明細表，也能看提前多還一點可以省下多少利息。",
      intro: ["借錢之前，有兩個數字最重要：每個月要還多少，以及總共要付多少利息。", "輸入貸款金額、年利率和期數。如果打算每月多還一點，也一起填入，看看能提早多久還清。"],
      comoSeCalcula: [
        "採用本息平均攤還（每期還款金額固定），這是信用貸款、車貸和房貸最常見的方式。",
        "月利率 ＝ 年利率 ÷ 12。",
        "每月還款 ＝ 貸款金額 × 月利率 ÷（1 −（1 ＋ 月利率）的負期數次方）。",
        "每個月按尚未還清的本金計息，還款額扣掉利息後的部分用來償還本金。",
      ],
      ejemplo: [
        `貸款 ${m(monto)}、年利率 12%、分 36 期，每月還款 ${m(cuotaFrancesa(monto, 12, 36))}，利息總共 ${m(interesesTotales(monto, 12, 36))}。`,
        `改成 60 期，每月還款降到 ${m(cuotaFrancesa(monto, 12, 60))}，但利息增加到 ${m(interesesTotales(monto, 12, 60))}。`,
      ],
      faq: [
        { pregunta: "每月還款怎麼算？", respuesta: "用本息平均攤還公式計算。每期金額相同，但前期大部分是利息，後期大部分是本金，所以一開始本金減少得比較慢。" },
        { pregunta: "提前還款划算嗎？", respuesta: "如果沒有高額的提前清償違約金，通常划算。多還的錢直接償還本金，那部分就不再計息。越早還，省得越多。" },
        { pregunta: "期數拉長比較好嗎？", respuesta: "每月還款變少，但總利息會多很多。兩個數字都比較過再決定。" },
        { pregunta: "為什麼銀行報的金額不一樣？", respuesta: "銀行常會加上保險費、手續費或稅費，或用和廣告不同的利率。比較方案時要看總費用，不只看利率。" },
      ],
      glosario: [
        { termino: "本金", definicion: "借來的錢中還沒還的部分。" },
        { termino: "年利率", definicion: "一年的利率，除以 12 就是用來計算每月利息的月利率。" },
        { termino: "本息平均攤還", definicion: "每期還款（本金加利息）金額固定的還款方式。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const monto = montoEjemplo(ctx, 10000);
    return {
      h1: "贷款计算器",
      title: tituloQueEntre(`贷款计算器（月供和利息）｜${ctx.nombrePais}`, `贷款计算器｜${ctx.nombrePais}`, "贷款计算器"),
      description: "算出贷款月供、利息总额和完整的还款计划表，还能看看每月多还一点可以节省多少利息。",
      intro: ["借钱之前，有两个数字最重要：每月要还多少，以及总共要付多少利息。", "输入贷款金额、年利率和期数。如果打算每月多还一点，也一起填入，看看能提前多久还清。"],
      comoSeCalcula: [
        "采用等额本息（每期还款金额固定），这是个人贷款、车贷和房贷最常见的还款方式。",
        "月利率 ＝ 年利率 ÷ 12。",
        "月供 ＝ 贷款金额 × 月利率 ÷（1 −（1 ＋ 月利率）的负期数次方）。",
        "每个月按尚未还清的本金计息，月供扣掉利息后的部分用于偿还本金。",
      ],
      ejemplo: [
        `贷款 ${m(monto)}、年利率 12%、分 36 期，月供 ${m(cuotaFrancesa(monto, 12, 36))}，利息总共 ${m(interesesTotales(monto, 12, 36))}。`,
        `改成 60 期，月供降到 ${m(cuotaFrancesa(monto, 12, 60))}，但利息增加到 ${m(interesesTotales(monto, 12, 60))}。`,
      ],
      faq: [
        { pregunta: "月供怎么算？", respuesta: "用等额本息公式计算。每期金额相同，但前期大部分是利息，后期大部分是本金，所以一开始本金减少得比较慢。" },
        { pregunta: "提前还款划算吗？", respuesta: "如果没有高额的提前还款违约金，通常划算。多还的钱直接偿还本金，那部分就不再计息。越早还，省得越多。" },
        { pregunta: "期数拉长更好吗？", respuesta: "月供变少，但总利息会多很多。两个数字都比较过再决定。" },
        { pregunta: "为什么银行报的金额不一样？", respuesta: "银行常会加上保险费、手续费或税费，或者用和广告不同的利率。比较方案时要看总费用，不只看利率。" },
      ],
      glosario: [
        { termino: "本金", definicion: "借来的钱中还没还的部分。" },
        { termino: "年利率", definicion: "一年的利率，除以 12 就是用来计算每月利息的月利率。" },
        { termino: "等额本息", definicion: "每期还款（本金加利息）金额固定的还款方式。" },
      ],
    };
  },
);
