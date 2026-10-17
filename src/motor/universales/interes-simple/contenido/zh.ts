import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const capital = montoEjemplo(ctx, 1000);
    return {
      h1: "單利計算機",
      title: tituloQueEntre(`單利計算機｜${ctx.nombrePais}`, "單利計算機"),
      description: "依本金和年利率，算出以天、月或年計的單利利息，可選擇一年 365 天或 360 天，並看到本利和。",
      intro: ["單利永遠以原本的本金計算利息：期間內利息不會併入本金。", "常用在短期存款、親友間借款，以及許多數學題目。"],
      comoSeCalcula: ["利息 ＝ 本金 × 年利率 × 年數。", "以月計就除以 12；以天計則依銀行的算法除以 365 或 360。", "本利和 ＝ 本金 ＋ 利息。"],
      ejemplo: [
        `${m(capital)} 以年利率 10% 存 6 個月，利息是 ${m(capital * 0.1 * 0.5)}。`,
        `同樣的本金存 90 天，一年算 365 天時利息是 ${m((capital * 0.1 * 90) / 365)}，算 360 天時是 ${m((capital * 0.1 * 90) / 360)}。`,
      ],
      faq: [
        { pregunta: "單利公式是什麼？", respuesta: `利息 ＝ 本金 × 年利率 × 年數。年利率要換成小數（10% 就是 ${formatearNumero(ctx, 0.1, 2)}）。` },
        { pregunta: "和複利有什麼不同？", respuesta: "單利永遠按同一筆本金計息；複利則把利息併入本金，利息也會再生利息。" },
        { pregunta: "為什麼有些銀行一年算 360 天？", respuesta: "這是為了方便計算的金融慣例。用 360 天算，利息會稍微高一點。請確認您往來的銀行用哪一種。" },
      ],
      glosario: [
        { termino: "本金", definicion: "借出或投入的原始金額。" },
        { termino: "單利", definicion: "只按原始本金計算利息的方式。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const capital = montoEjemplo(ctx, 1000);
    return {
      h1: "单利计算器",
      title: tituloQueEntre(`单利计算器｜${ctx.nombrePais}`, "单利计算器"),
      description: "根据本金和年利率，算出按天、月或年计的单利利息，可选择一年 365 天或 360 天，并看到本息合计。",
      intro: ["单利始终按原来的本金计算利息：期间内利息不会计入本金。", "常用于短期存款、亲友间借款，以及很多数学题。"],
      comoSeCalcula: ["利息 ＝ 本金 × 年利率 × 年数。", "按月计就除以 12；按天计则根据银行的算法除以 365 或 360。", "本息合计 ＝ 本金 ＋ 利息。"],
      ejemplo: [
        `${m(capital)} 按年利率 10% 存 6 个月，利息是 ${m(capital * 0.1 * 0.5)}。`,
        `同样的本金存 90 天，一年按 365 天算利息是 ${m((capital * 0.1 * 90) / 365)}，按 360 天算是 ${m((capital * 0.1 * 90) / 360)}。`,
      ],
      faq: [
        { pregunta: "单利公式是什么？", respuesta: `利息 ＝ 本金 × 年利率 × 年数。年利率要换成小数（10% 就是 ${formatearNumero(ctx, 0.1, 2)}）。` },
        { pregunta: "和复利有什么不同？", respuesta: "单利始终按同一笔本金计息；复利则把利息计入本金，利息也会再产生利息。" },
        { pregunta: "为什么有些银行一年按 360 天算？", respuesta: "这是为了方便计算的金融惯例。按 360 天算，利息会稍高一点。请确认您办理业务的银行用哪一种。" },
      ],
      glosario: [
        { termino: "本金", definicion: "借出或投入的原始金额。" },
        { termino: "单利", definicion: "只按原始本金计算利息的方式。" },
      ],
    };
  },
);
