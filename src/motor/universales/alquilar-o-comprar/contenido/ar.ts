import { contenidoArabe } from "../../comun/arabe";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoAr: ContenidoUniversal = contenidoArabe((ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "الشراء" : "الإيجار");
  return {
    h1: "حاسبة الإيجار أم الشراء",
    title: tituloQueEntre(`حاسبة الإيجار أم الشراء في ${ctx.nombrePais}`, "الإيجار أم الشراء: حاسبة المقارنة", "الإيجار أم الشراء"),
    description: "قارن بين استئجار منزل وشرائه على عدد السنوات الذي تختاره، واعرف أي خيار يترك لك ثروة أكبر، ومن أي سنة، وبكم.",
    intro: [
      "لا تكفي مقارنة قسط التمويل العقاري بالإيجار. من يشتري يدفع فوائد وصيانة وضريبة عقار، لكنه يملك المنزل في النهاية. ومن يستأجر يستطيع أن يستثمر الدفعة الأولى.",
      "تجمع هذه الحاسبة كل ذلك سنة بعد سنة، وتبيّن لك أي خيار يترك لك صافي ثروة أكبر.",
    ],
    comoSeCalcula: [
      "الشراء: تدفع كل شهر قسط التمويل ومصاريف المالك. وصافي ثروتك هو قيمة العقار ناقص ما تبقى عليك من دين.",
      "الإيجار: تبقى الدفعة الأولى ومصاريف الشراء مستثمرة بعائد الاستثمار البديل، ويرتفع الإيجار كل سنة.",
      "كل شهر، من ينفق أقل يستثمر الفرق، فيخرج الخياران من الميزانية نفسها.",
      "الخيار الأفضل هو الذي يترك صافي ثروة أكبر في النهاية.",
    ],
    ejemplo: [
      `عقار سعره ${m(precio)} مع دفعة أولى 20% وتمويل عقاري بفائدة 7% على 25 سنة، مقابل إيجار شهري قدره ${m(alquiler)}.`,
      `على 10 سنوات يتفوق ${quien(a10)} بفارق ${m(Math.abs(a10.comprar - a10.alquilar))}. وعلى 3 سنوات يتفوق ${quien(a3)} بفارق ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "هل الإيجار مال ضائع؟",
        respuesta:
          "ليس تمامًا. من يشتري يدفع أيضًا تكاليف لا تعود إليه: الفوائد وضريبة العقار والصيانة. المهم هو ما تملكه في النهاية في كل حالة.",
      },
      {
        pregunta: "لماذا تتغير النتيجة بتغير عدد السنوات؟",
        respuesta:
          "للشراء تكاليف كبيرة في البداية (مصاريف الشراء والفوائد الأولى) تحتاج وقتًا لتعويضها. إذا كنت تنوي الانتقال قريبًا، فالإيجار غالبًا هو الأفضل.",
      },
      {
        pregunta: "ما أهم رقم في الحساب؟",
        respuesta:
          "النسبة بين سعر العقار والإيجار، ومعدل فائدة التمويل، وسرعة ارتفاع أسعار العقارات. جرّب تغيير ارتفاع الأسعار وعائد الاستثمار لترى كم تتغير النتيجة.",
      },
    ],
    glosario: [
      { termino: "صافي الثروة", definicion: "ما تملكه ناقص ما عليك من ديون." },
      { termino: "ارتفاع السعر", definicion: "مقدار زيادة قيمة العقار كل سنة." },
      { termino: "تكلفة الفرصة البديلة", definicion: "ما كانت الدفعة الأولى ستكسبه لو استثمرتها." },
    ],
  };
});
