import { contenidoPorEscritura } from "../../comun/chino";
import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const INICIO = "2026-03-02";

function fechas() {
  const mas90 = aFecha(aDia(INICIO) + 90);
  let habil = aDia(INICIO);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return { mas90, habil: aFecha(habil) };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    const { mas90, habil } = fechas();
    return {
      h1: "日期推算計算機",
      title: tituloQueEntre(`日期推算計算機（幾天後、幾天前）｜${ctx.nombrePais}`, `日期推算計算機｜${ctx.nombrePais}`, "日期推算計算機"),
      description: "從某個日期加上或減去日曆天或工作日，看看會落在哪一天、星期幾，方便確認各種期限和到期日。",
      intro: ["選擇日期、天數和要加還是減，就能看到計算後的日期和星期幾。", "選擇工作日時，會跳過週六和週日。"],
      comoSeCalcula: ["日曆天：每輸入一天，就在日曆上往前或往後移一天。", "工作日：只算週一到週五，起始日期本身不算。", "未扣除國定假日，因為假日依國家和地區而不同。"],
      ejemplo: [`${f(INICIO)}加 90 天是${f(mas90)}。`, `${f(INICIO)}加 15 個工作日是${f(habil)}。`],
      faq: [
        { pregunta: "起始日期算第一天嗎？", respuesta: "不算。週一加 1 天是週二，大部分期限都是這樣計算。" },
        { pregunta: "從週六開始加工作日會怎樣？", respuesta: "第一個工作日是下週一。週六加 1 個工作日就是週一。" },
        { pregunta: "有考慮閏年嗎？", respuesta: "有。期間內如果有 2 月 29 日，就會多算一天。" },
      ],
      glosario: [
        { termino: "日曆天", definicion: "日曆上的每一天，一天都不跳過。" },
        { termino: "工作日", definicion: "在這個計算機中指週一到週五。" },
      ],
    };
  },
  (ctx) => {
    const f = (iso: string) => fechaLarga(ctx.locale, iso);
    const { mas90, habil } = fechas();
    return {
      h1: "日期推算计算器",
      title: tituloQueEntre(`日期推算计算器（几天后、几天前）｜${ctx.nombrePais}`, `日期推算计算器｜${ctx.nombrePais}`, "日期推算计算器"),
      description: "从某个日期加上或减去日历天或工作日，看看会落在哪一天、星期几，方便确认各种期限和到期日。",
      intro: ["选择日期、天数和要加还是减，就能看到计算后的日期和星期几。", "选择工作日时，会跳过周六和周日。"],
      comoSeCalcula: ["日历天：每输入一天，就在日历上往前或往后移一天。", "工作日：只算周一到周五，起始日期本身不算。", "未扣除法定节假日，因为节假日因国家和地区而异。"],
      ejemplo: [`${f(INICIO)}加 90 天是${f(mas90)}。`, `${f(INICIO)}加 15 个工作日是${f(habil)}。`],
      faq: [
        { pregunta: "起始日期算第一天吗？", respuesta: "不算。周一加 1 天是周二，大部分期限都是这样计算的。" },
        { pregunta: "从周六开始加工作日会怎样？", respuesta: "第一个工作日是下周一。周六加 1 个工作日就是周一。" },
        { pregunta: "考虑闰年了吗？", respuesta: "考虑了。期间内如果有 2 月 29 日，就会多算一天。" },
      ],
      glosario: [
        { termino: "日历天", definicion: "日历上的每一天，一天都不跳过。" },
        { termino: "工作日", definicion: "在这个计算器中指周一到周五。" },
      ],
    };
  },
);
