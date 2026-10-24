import { contenidoPorEscritura } from "../../comun/chino";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const DESDE = "2026-03-02";
const HASTA = "2026-06-30";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const dias = aDia(HASTA) - aDia(DESDE);
    const habiles = habilesEntre(aDia(DESDE), aDia(HASTA));
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    return {
      h1: "日期天數計算機",
      title: tituloQueEntre(`日期天數計算機｜${ctx.nombrePais}`, "日期天數計算機"),
      description: "計算兩個日期之間相隔幾天：日曆天數、週數、月數，以及週一到週五的工作日天數。",
      intro: ["選擇開始和結束日期，就能看到日曆天數、換算成週和月的期間，以及工作日天數。", "可用於期限、繳款日、假期、孕期或倒數計時。"],
      comoSeCalcula: [
        "日曆天數是兩個日期之間的每一天。開始日期算進去，結束日期除非勾選選項，否則不算。",
        "工作日是同一期間內的週一到週五，未扣除國定假日。",
        "閏年會算進 2 月 29 日。",
      ],
      ejemplo: [`從${f(DESDE)}到${f(HASTA)}共 ${dias} 天。`, `其中週一到週五有 ${habiles} 天。`],
      faq: [
        { pregunta: "第一天和最後一天都算嗎？", respuesta: "預設算第一天、不算最後一天，就像兩個日期相減。如果兩天都要算，請勾選「包含結束日期」。" },
        { pregunta: "工作日有扣掉國定假日嗎？", respuesta: "沒有，只算週一到週五。假日依國家、地區和年份而不同，請另外扣除。" },
        { pregunta: "一年有幾天？", respuesta: "365 天，閏年 366 天。所以同樣的月日，在不同年份相隔的天數可能不一樣。" },
      ],
      glosario: [
        { termino: "日曆天數", definicion: "日曆上的每一天，包括週末和假日。" },
        { termino: "工作日", definicion: "在這個計算機中指週一到週五。" },
      ],
    };
  },
  (ctx) => {
    const dias = aDia(HASTA) - aDia(DESDE);
    const habiles = habilesEntre(aDia(DESDE), aDia(HASTA));
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    return {
      h1: "日期天数计算器",
      title: tituloQueEntre(`日期天数计算器｜${ctx.nombrePais}`, "日期天数计算器"),
      description: "计算两个日期之间相隔几天：日历天数、周数、月数，以及周一到周五的工作日天数。",
      intro: ["选择开始和结束日期，就能看到日历天数、换算成周和月的期间，以及工作日天数。", "可用于期限、还款日、假期、孕期或倒计时。"],
      comoSeCalcula: [
        "日历天数是两个日期之间的每一天。开始日期算在内，结束日期除非勾选选项，否则不算。",
        "工作日是同一期间内的周一到周五，未扣除法定节假日。",
        "闰年会算上 2 月 29 日。",
      ],
      ejemplo: [`从${f(DESDE)}到${f(HASTA)}共 ${dias} 天。`, `其中周一到周五有 ${habiles} 天。`],
      faq: [
        { pregunta: "第一天和最后一天都算吗？", respuesta: "默认算第一天、不算最后一天，就像两个日期相减。如果两天都要算，请勾选“包含结束日期”。" },
        { pregunta: "工作日扣除了法定节假日吗？", respuesta: "没有，只算周一到周五。节假日因国家、地区和年份而不同，请另行扣除。" },
        { pregunta: "一年有多少天？", respuesta: "365 天，闰年 366 天。所以同样的月日，在不同年份相隔的天数可能不一样。" },
      ],
      glosario: [
        { termino: "日历天数", definicion: "日历上的每一天，包括周末和节假日。" },
        { termino: "工作日", definicion: "在这个计算器中指周一到周五。" },
      ],
    };
  },
);
