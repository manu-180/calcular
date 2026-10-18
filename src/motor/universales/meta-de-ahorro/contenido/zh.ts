import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const meta = montoEjemplo(ctx, 10000);
    const actual = montoEjemplo(ctx, 1000);
    return {
      h1: "存錢目標計算機",
      title: tituloQueEntre(`存錢目標計算機｜${ctx.nombrePais}`, "存錢目標計算機"),
      description: "算出每月要存多少，才能在期限內存到需要的金額，連同現有存款和存款的報酬一起計算。",
      intro: ["旅行、買車、房子的頭期款，或是應付意外的預備金。有金額、有期限的目標，比較容易達成。", "輸入想存的金額和月數，我們告訴您每月和每週要存多少。"],
      comoSeCalcula: ["先算出現有存款到期末會增加到多少。", "還差的部分平均分成每月存入的金額。", "如果存款有利息，每月存入的錢也會生息，所以可以少存一點。"],
      ejemplo: [`不計利息，要在 24 個月存到 ${m(meta)}，每月要存 ${m(meta / 24)}。`, `如果已經有 ${m(actual)}，年報酬率 5%，每月存 ${m(aporteNecesario(meta, actual, 24, 5))} 就夠了。`],
      faq: [
        { pregunta: "怎麼才能持續達成目標？", respuesta: "一領到薪水，在花錢之前就先轉出去。可以的話，設定自動轉帳到另一個帳戶。" },
        { pregunta: "每月金額太高怎麼辦？", respuesta: "拉長時間，或降低目標金額。也可以先從負擔得起的金額開始，收入增加時再提高。" },
        { pregunta: "要考慮通膨嗎？", respuesta: "如果目標在好幾年後，請把預期的通膨加進金額。今天 100 元買得到的東西，到時候可能貴上不少。" },
      ],
      glosario: [
        { termino: "每月存款", definicion: "每個月為目標存下的錢。" },
        { termino: "報酬率", definicion: "存款在帳戶或投資中賺到的比例。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const meta = montoEjemplo(ctx, 10000);
    const actual = montoEjemplo(ctx, 1000);
    return {
      h1: "存钱目标计算器",
      title: tituloQueEntre(`存钱目标计算器｜${ctx.nombrePais}`, "存钱目标计算器"),
      description: "算出每月要存多少，才能在期限内存到需要的金额，连同现有存款和存款的收益一起计算。",
      intro: ["旅行、买车、买房首付，或者应对意外的备用金。有金额、有期限的目标，更容易实现。", "输入想存的金额和月数，我们告诉您每月和每周要存多少。"],
      comoSeCalcula: ["先算出现有存款到期末会增加到多少。", "还差的部分平均分成每月存入的金额。", "如果存款有利息，每月存入的钱也会生息，所以可以少存一点。"],
      ejemplo: [`不计利息，要在 24 个月存到 ${m(meta)}，每月要存 ${m(meta / 24)}。`, `如果已经有 ${m(actual)}，年收益率 5%，每月存 ${m(aporteNecesario(meta, actual, 24, 5))} 就够了。`],
      faq: [
        { pregunta: "怎样才能坚持实现目标？", respuesta: "一发工资，在花钱之前就先转出去。可以的话，设置自动转账到另一个账户。" },
        { pregunta: "每月金额太高怎么办？", respuesta: "延长时间，或者降低目标金额。也可以先从负担得起的金额开始，收入增加时再提高。" },
        { pregunta: "要考虑通胀吗？", respuesta: "如果目标在好几年后，请把预期的通胀加进金额。今天 100 块买得到的东西，到时候可能贵不少。" },
      ],
      glosario: [
        { termino: "每月存款", definicion: "每个月为目标存下的钱。" },
        { termino: "收益率", definicion: "存款在账户或理财中赚到的比例。" },
      ],
    };
  },
);
