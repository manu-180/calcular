import { contenidoArabe } from "../../comun/arabe";
import { type FormasAr, pluralAr } from "../../../i18n/arabe";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const BLATAS: FormasAr = { uno: "بلاطة واحدة", dos: "بلاطتان", pocos: "{n} بلاطات", muchos: "{n} بلاطة", otros: "{n} بلاطة" };
const CAJAS: FormasAr = { uno: "صندوق واحد", dos: "صندوقان", pocos: "{n} صناديق", muchos: "{n} صندوقًا", otros: "{n} صندوق" };

export const contenidoAr: ContenidoUniversal = contenidoArabe((ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const cuantas = (x: number, f: FormasAr) => pluralAr(x, f, formatearNumero(ctx, x, 0));
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const piezas = Math.ceil((150 * 1.1) / 1 - 1e-9);
        return [
          `لمساحة 150 قدمًا مربعًا ببلاط مقاسه 12 × 12 بوصة (قدم مربع واحد للبلاطة) وهدر 10%، تحتاج إلى ${cuantas(piezas, BLATAS)}.`,
          `وإذا كان الصندوق يحتوي على 10 بلاطات، فهذا يعني ${cuantas(Math.ceil(piezas / 10), CAJAS)}.`,
        ];
      })()
    : (() => {
        const pieza = 0.6 * 0.6;
        const piezas = Math.ceil((20 * 1.1) / pieza - 1e-9);
        return [
          `لمساحة 20 م² ببلاط مقاسه 60 × 60 سم (${n(pieza)} م² للبلاطة) وهدر 10%، تحتاج إلى ${cuantas(piezas, BLATAS)}.`,
          `وإذا كان الصندوق يحتوي على 4 بلاطات، فهذا يعني ${cuantas(Math.ceil(piezas / 4), CAJAS)}.`,
        ];
      })();
  return {
    h1: "حاسبة البلاط",
    title: tituloQueEntre(`حاسبة البلاط في ${ctx.nombrePais}`, "حاسبة البلاط والسيراميك", "حاسبة البلاط"),
    description: "احسب عدد البلاطات التي تحتاجها لأرضية أو جدار مع نسبة الهدر، وعدد الصناديق التي تشتريها.",
    intro: [
      "أدخل المساحة ومقاس البلاطة وعدد البلاطات في الصندوق، فتعرف كم بلاطة وكم صندوقًا تشتري.",
      "نسبة الهدر تغطي القص عند الأطراف وما قد ينكسر من البلاط.",
    ],
    comoSeCalcula: [
      `مساحة البلاطة = الطول × العرض، محوّلة إلى ${imperial ? "القدم المربع" : "المتر المربع"}.`,
      "عدد البلاطات = المساحة × (1 + الهدر ÷ 100) ÷ مساحة البلاطة، مع التقريب إلى الأعلى.",
      "عدد الصناديق = عدد البلاطات ÷ عدد البلاطات في الصندوق، مع التقريب إلى الأعلى.",
    ],
    ejemplo,
    faq: [
      {
        pregunta: "ما نسبة الهدر التي أضيفها؟",
        respuesta: "10% للتركيب المستقيم. وللتركيب المائل أو المتعرج، أو للغرف التي تحتاج إلى قص كثير، من 15% إلى 20%.",
      },
      {
        pregunta: "هل أحسب الفواصل بين البلاطات؟",
        respuesta: "لا. فعرض الفواصل بضعة مليمترات، ونسبة الهدر تغطي هذا الفرق.",
      },
      {
        pregunta: "هل أشتري بلاطًا إضافيًا؟",
        respuesta: "نعم، بضع بلاطات احتياطية من دفعة الإنتاج نفسها. فإذا انكسرت بلاطة لاحقًا قد يصعب العثور على اللون نفسه.",
      },
    ],
    glosario: [
      { termino: "نسبة الهدر", definicion: "النسبة الإضافية التي تشتريها لتغطية القص والكسر." },
      { termino: "دفعة الإنتاج", definicion: "الكمية المصنّعة في تشغيلة واحدة. وقد يختلف لون البلاط قليلًا من دفعة إلى أخرى." },
    ],
  };
});
