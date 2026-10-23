import { contenidoPorEscritura } from "../../comun/chino";
import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionZh } from "../../dias-entre-fechas/textos/zh";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const NAC = "1990-05-15";
const REF = "2026-10-13";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const { meses, dias } = mesesYDias(NAC, REF);
    const total = aDia(REF) - aDia(NAC);
    return {
      h1: "年齡計算機",
      title: tituloQueEntre(`年齡計算機（足歲）｜${ctx.nombrePais}`, `年齡計算機｜${ctx.nombrePais}`, "年齡計算機"),
      description: "用出生日期算出精確的足歲年齡，精確到年、月、日，還能知道已經活了幾天、距離下次生日還有幾天。",
      intro: ["輸入出生日期，就能看到今天的精確年齡，也會換算成月、週和天。", "改變第二個日期，就能查某一天的年齡，或是到那天會滿幾歲。"],
      comoSeCalcula: ["從出生日算到選定日期之間滿了幾個月，每 12 個月算一歲。", "最後一個整月之後剩下的天數，就是年齡中的「天」。", "閏年以 366 天計算。"],
      ejemplo: [
        `${fechaLarga(ctx.locale, NAC)}出生的人，到${fechaLarga(ctx.locale, REF)}是 ${duracionZh(ctx.locale)(Math.floor(meses / 12), meses % 12, dias)}。`,
        `換算成天數是 ${formatearNumero(ctx, total)} 天。`,
      ],
      faq: [
        { pregunta: "精確年齡怎麼算？", respuesta: "先算滿了幾年，再算上次生日以來滿了幾個月，最後是剩下的天數。" },
        { pregunta: "2 月 29 日出生的人怎麼算？", respuesta: "在非閏年，這個計算機以 2 月 28 日作為生日。有些法律則以 3 月 1 日為準。" },
        { pregunta: "我已經出生幾天了？", respuesta: "請看「換算成天」那一列。它計算從出生到選定日期的每一天，不包括選定日期當天。" },
      ],
      glosario: [
        { termino: "足歲", definicion: "從出生起滿了幾年。" },
        { termino: "閏年", definicion: "有 2 月 29 日、共 366 天的年份。每四年一次，但部分整百年除外。" },
      ],
    };
  },
  (ctx) => {
    const { meses, dias } = mesesYDias(NAC, REF);
    const total = aDia(REF) - aDia(NAC);
    return {
      h1: "年龄计算器",
      title: tituloQueEntre(`年龄计算器（周岁）｜${ctx.nombrePais}`, `年龄计算器｜${ctx.nombrePais}`, "年龄计算器"),
      description: "用出生日期算出精确的周岁年龄，精确到年、月、日，还能知道已经活了多少天、距离下次生日还有几天。",
      intro: ["输入出生日期，就能看到今天的精确年龄，也会换算成月、周和天。", "改变第二个日期，就能查某一天的年龄，或者到那天会满几岁。"],
      comoSeCalcula: ["从出生日算到选定日期之间满了几个月，每 12 个月算一岁。", "最后一个整月之后剩下的天数，就是年龄中的“天”。", "闰年按 366 天计算。"],
      ejemplo: [
        `${fechaLarga(ctx.locale, NAC)}出生的人，到${fechaLarga(ctx.locale, REF)}是 ${duracionZh(ctx.locale)(Math.floor(meses / 12), meses % 12, dias)}。`,
        `换算成天数是 ${formatearNumero(ctx, total)} 天。`,
      ],
      faq: [
        { pregunta: "精确年龄怎么算？", respuesta: "先算满了几年，再算上次生日以来满了几个月，最后是剩下的天数。" },
        { pregunta: "2 月 29 日出生的人怎么算？", respuesta: "在非闰年，这个计算器以 2 月 28 日作为生日。有些法律则以 3 月 1 日为准。" },
        { pregunta: "我已经出生多少天了？", respuesta: "请看“换算成天”那一行。它计算从出生到选定日期的每一天，不包括选定日期当天。" },
      ],
      glosario: [
        { termino: "周岁", definicion: "从出生起满了几年。" },
        { termino: "闰年", definicion: "有 2 月 29 日、共 366 天的年份。每四年一次，但部分整百年除外。" },
      ],
    };
  },
);
