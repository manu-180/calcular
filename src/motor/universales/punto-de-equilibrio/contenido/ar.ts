import { contenidoArabe } from "../../comun/arabe";
import { pluralAr, type FormasAr } from "../../../i18n/arabe";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

const UNIDADES: FormasAr = { uno: "وحدة واحدة", dos: "وحدتين", pocos: "{n} وحدات", muchos: "{n} وحدة", otros: "{n} وحدة" };

export const contenidoAr: ContenidoUniversal = contenidoArabe((ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const u = (n: number) => pluralAr(n, UNIDADES, formatearNumero(ctx, n));
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "حاسبة نقطة التعادل",
    title: tituloQueEntre(`حاسبة نقطة التعادل في ${ctx.nombrePais}`, `نقطة التعادل في ${ctx.nombrePais}`, "حاسبة نقطة التعادل"),
    description: "اعرف عدد الوحدات التي تحتاج إلى بيعها وحجم المبيعات اللازم كل شهر لتغطية تكاليفك، ثم لتحقيق الربح الذي تستهدفه.",
    intro: [
      "نقطة التعادل هي مستوى المبيعات الذي لا يربح عنده النشاط ولا يخسر. تحته تخسر، وفوقه تبدأ بتحقيق الربح.",
      "أدخل تكاليفك الثابتة وسعر الوحدة وتكلفتها، فتعرف كم يجب أن تبيع لتغطية التكاليف ولبلوغ هدفك.",
    ],
    comoSeCalcula: [
      "هامش المساهمة = السعر − التكلفة المتغيرة للوحدة.",
      "وحدات التعادل = التكاليف الثابتة ÷ هامش المساهمة، مقربة إلى الأعلى.",
      "مبيعات التعادل = التكاليف الثابتة ÷ (هامش المساهمة ÷ السعر).",
      "لتحقيق ربح مستهدف، أضفه إلى التكاليف الثابتة وطبّق الحساب نفسه.",
    ],
    ejemplo: [
      `مع تكاليف ثابتة قدرها ${m(fijos)} وسعر ${m(precio)} وتكلفة متغيرة ${m(variable)}، تترك كل عملية بيع ${m(precio - variable)}.`,
      `تحتاج إلى بيع ${u(base.unidades)} (${m(base.facturacion)}) لتغطية التكاليف، وإلى ${u(meta.unidades)} لتربح ${m(objetivo)} في الشهر.`,
    ],
    faq: [
      {
        pregunta: "ما التكاليف الثابتة والمتغيرة؟",
        respuesta: "التكاليف الثابتة لا تتغير حتى لو لم تبع شيئًا، مثل الإيجار والرواتب الثابتة والفواتير. أما المتغيرة فتزيد مع كل عملية بيع، مثل البضاعة والمواد والعمولات والشحن.",
      },
      {
        pregunta: "كيف أخفض نقطة التعادل؟",
        respuesta: "هناك ثلاث طرق: رفع السعر، أو خفض التكلفة المتغيرة للوحدة، أو تقليل التكاليف الثابتة. والسعر في الغالب هو الأكثر تأثيرًا.",
      },
      {
        pregunta: "هل تصلح لنشاط يقدّم خدمات؟",
        respuesta: "نعم. يمكن أن تكون الوحدة ساعة أو جلسة أو عميلًا في الشهر. استخدم ما يكلفك تقديم كل واحدة منها كتكلفة متغيرة.",
      },
    ],
    glosario: [
      { termino: "نقطة التعادل", definicion: "مستوى المبيعات الذي تتساوى عنده الإيرادات مع التكاليف." },
      { termino: "هامش المساهمة", definicion: "ما تتركه كل عملية بيع لتغطية التكاليف الثابتة." },
    ],
  };
});
