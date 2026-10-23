import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const a = montoEjemplo(ctx, 90);
    const b = montoEjemplo(ctx, 30);
    const cuota = (a + b) / 3;
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "分帳計算機",
      title: tituloQueEntre(`分帳計算機｜${ctx.nombrePais}`, "分帳計算機"),
      description: "最多 8 個人分攤共同花費：算出每人應分攤的金額，以及誰該付給誰，轉帳次數越少越好。",
      intro: ["適合旅行、聚餐、派對或合租住宿等每個人先墊付不同金額的情況。", "填入每個人付了多少，就能看到每人應分攤的金額和結清所需的轉帳。"],
      comoSeCalcula: [
        "每人應分攤 ＝ 總花費 ÷ 人數。",
        "付得比應分攤少的人要補差額，付得比較多的人可以拿回差額。",
        "轉帳從欠最多的人對應到墊最多的人，不會多出不必要的轉帳。",
      ],
      ejemplo: [
        `小安付了 ${m(a)}，小班付了 ${m(b)}，小卡沒付。總花費 ${m(a + b)}，每人應分攤 ${m(cuota)}。`,
        `小卡付給小安 ${m(cuota)}，小班付給小安 ${m(cuota - b)}。`,
      ],
      faq: [
        { pregunta: "每個人付的金額不同，要怎麼分帳？", respuesta: "全部加起來除以人數，再和每個人實際付的金額比較，差額就是要補或要拿回的錢。" },
        { pregunta: "如果有人完全沒付錢呢？", respuesta: "在他的欄位填 0，他就會算進分攤人數。欄位留空的話，就不會算進去。" },
        { pregunta: "為什麼轉帳次數比人數少？", respuesta: "因為欠款會合併處理：欠最多的人付給墊最多的人，依此類推。轉帳次數不會超過人數減一。" },
      ],
      glosario: [
        { termino: "應分攤金額", definicion: "總花費中每個人應該負擔的部分。" },
        { termino: "差額", definicion: "實際付的金額和應分攤金額之間的差距。" },
      ],
    };
  },
  (ctx) => {
    const a = montoEjemplo(ctx, 90);
    const b = montoEjemplo(ctx, 30);
    const cuota = (a + b) / 3;
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "AA制计算器",
      title: tituloQueEntre(`AA制计算器｜${ctx.nombrePais}`, "AA制计算器"),
      description: "最多 8 个人分摊共同花费：算出每人应分摊的金额，以及谁该付给谁，转账次数尽量少。",
      intro: ["适合旅行、聚餐、派对或合租住宿等每个人先垫付不同金额的情况。", "填入每个人付了多少，就能看到每人应分摊的金额和结清所需的转账。"],
      comoSeCalcula: [
        "每人应分摊 ＝ 总花费 ÷ 人数。",
        "付得比应分摊少的人要补差额，付得多的人可以拿回差额。",
        "转账从欠得最多的人对应到垫得最多的人，不会多出不必要的转账。",
      ],
      ejemplo: [
        `小安付了 ${m(a)}，小班付了 ${m(b)}，小卡没付。总花费 ${m(a + b)}，每人应分摊 ${m(cuota)}。`,
        `小卡付给小安 ${m(cuota)}，小班付给小安 ${m(cuota - b)}。`,
      ],
      faq: [
        { pregunta: "每个人付的金额不同，要怎么AA？", respuesta: "全部加起来除以人数，再和每个人实际付的金额比较，差额就是要补或要拿回的钱。" },
        { pregunta: "如果有人完全没付钱呢？", respuesta: "在他的栏目填 0，他就会算进分摊人数。栏目留空的话，就不会算进去。" },
        { pregunta: "为什么转账次数比人数少？", respuesta: "因为欠款会合并处理：欠得最多的人付给垫得最多的人，以此类推。转账次数不会超过人数减一。" },
      ],
      glosario: [
        { termino: "应分摊金额", definicion: "总花费中每个人应该负担的部分。" },
        { termino: "差额", definicion: "实际付的金额和应分摊金额之间的差距。" },
      ],
    };
  },
);
