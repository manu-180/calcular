import { contenidoArabe } from "../../comun/arabe";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoAr: ContenidoUniversal = contenidoArabe((ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "حاسبة هامش الربح",
    title: tituloQueEntre(`حاسبة هامش الربح في ${ctx.nombrePais}`, `هامش الربح في ${ctx.nombrePais}`, "حاسبة هامش الربح"),
    description: "احسب هامش الربح ونسبة الإضافة على التكلفة من التكلفة والسعر، أو سعر البيع الذي تحتاجه لتحقيق الهامش الذي تريده.",
    intro: [
      "يخلط كثيرون بين هامش الربح ونسبة الإضافة على التكلفة، وقد يكلفك هذا الخلط مالًا. كلاهما يقيس الربح نفسه، لكن مقارنة بأساس مختلف.",
      "أدخل التكلفة والسعر لترى النسبتين، أو اختر هامشًا لتعرف السعر الذي يجب أن تبيع به.",
    ],
    comoSeCalcula: [
      "الربح = السعر − التكلفة.",
      "هامش الربح = الربح ÷ السعر × 100.",
      "نسبة الإضافة على التكلفة = الربح ÷ التكلفة × 100.",
      "السعر الذي يحقق هامشًا مستهدفًا = التكلفة ÷ (1 − الهامش ÷ 100).",
    ],
    ejemplo: [
      `منتج تكلفته ${m(costo)} ويُباع بسعر ${m(precio)} يحقق ربحًا قدره ${m(precio - costo)}، أي هامش ربح ${p(((precio - costo) / precio) * 100)} ونسبة إضافة على التكلفة ${p(((precio - costo) / costo) * 100)}.`,
      `لتحقيق هامش 50% على هذه التكلفة يجب أن تبيع بسعر ${m(precioConMargen(costo, 50))}. أما إضافة 50% إلى التكلفة فلا تعطي إلا هامشًا قدره ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "ما الفرق بين هامش الربح ونسبة الإضافة على التكلفة؟",
        respuesta: "هامش الربح هو الربح مقارنة بسعر البيع، ونسبة الإضافة هي الربح مقارنة بالتكلفة. مع الربح نفسه تكون نسبة الإضافة دائمًا الرقم الأكبر.",
      },
      {
        pregunta: "كيف أحدد سعرًا يحقق هامشًا مستهدفًا؟",
        respuesta: `اقسم التكلفة على (1 − الهامش). لهامش 30% اقسم التكلفة على ${formatearNumero(ctx, 0.7, 2)}. لا تضف 30% إلى التكلفة، لأنك ستربح أقل مما تظن.`,
      },
      {
        pregunta: "هل تشمل التكلفة الضرائب؟",
        respuesta: "استخدم التكلفة والسعر دون الضرائب التي يدفعها العميل، مثل ضريبة القيمة المضافة أو ضريبة المبيعات، وإلا بدا الهامش أكبر من حقيقته.",
      },
    ],
    glosario: [
      { termino: "هامش الربح", definicion: "الربح كنسبة مئوية من سعر البيع." },
      { termino: "نسبة الإضافة على التكلفة (Markup)", definicion: "الربح كنسبة مئوية من التكلفة." },
    ],
  };
});
