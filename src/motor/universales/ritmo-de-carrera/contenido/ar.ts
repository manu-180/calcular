import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoAr: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ميل" : "كيلومتر";
  const corto = imperial ? "ميل" : "كم";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "حاسبة وتيرة الجري",
    title: tituloQueEntre(`حاسبة وتيرة الجري في ${ctx.nombrePais}`, "حاسبة وتيرة الجري"),
    description: `احسب وتيرتك لكل ${u} أو زمن وصولك أو المسافة التي تقطعها في سباق 5 كم أو 10 كم أو نصف الماراثون أو الماراثون.`,
    intro: [
      "إذا عرفت رقمين من الثلاثة (المسافة والزمن والوتيرة) تحصل على الثالث. استخدمها لتخطط لسباق أو لتراجع تمرينًا.",
      "مسافات 5 كم و10 كم ونصف الماراثون والماراثون موجودة جاهزة.",
    ],
    comoSeCalcula: [
      `الوتيرة = الزمن ÷ المسافة، بالدقائق والثواني لكل ${u}.`,
      "الزمن = الوتيرة × المسافة.",
      "المسافة = الزمن ÷ الوتيرة. ومتوسط السرعة هو المسافة مقسومة على عدد الساعات.",
    ],
    ejemplo: imperial
      ? [
          `قطع 3 أميال في 27 دقيقة يعني وتيرة 9:00 لكل ميل، بسرعة ${formatearNumero(ctx, 20 / 3, 2)} ميل/ساعة.`,
          `نصف ماراثون (${formatearNumero(ctx, media, 2)} ميل) بوتيرة ${ritmoTexto(ritmoMedia)} لكل ميل ينتهي في ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "قطع 10 كم في 50 دقيقة يعني وتيرة 5:00 لكل كيلومتر، بسرعة 12 كم/ساعة.",
          `نصف ماراثون (${formatearNumero(ctx, media, 1)} ${corto}) بوتيرة ${ritmoTexto(ritmoMedia)} لكل كيلومتر ينتهي في ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `كيف أحسب وتيرتي لكل ${u}؟`,
        respuesta: imperial
          ? `حوّل الزمن إلى دقائق واقسمه على عدد الأميال. قطع 3 أميال في 28 دقيقة و30 ثانية يساوي ${formatearNumero(ctx, 9.5, 1)} دقيقة لكل ميل، أي 9:30.`
          : `حوّل الزمن إلى دقائق واقسمه على عدد الكيلومترات. قطع 10 كم في 55 دقيقة يساوي ${formatearNumero(ctx, 5.5, 1)} دقيقة لكل كيلومتر، أي 5:30.`,
      },
      {
        pregunta: "ما الوتيرة المناسبة للمبتدئ؟",
        respuesta: "الوتيرة التي تسمح لك بالكلام وأنت تجري. وتتحسن هذه الوتيرة مع تحسن لياقتك.",
      },
      {
        pregunta: "كم طول الماراثون؟",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} كم (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} ميل). ونصف الماراثون نصف هذه المسافة.`,
      },
    ],
    glosario: [
      { termino: "الوتيرة", definicion: "الوقت الذي تستغرقه لقطع كيلومتر واحد أو ميل واحد." },
      { termino: "متوسط السرعة", definicion: "المسافة المقطوعة في الساعة الواحدة." },
    ],
  };
};
