import { pluralAr, type FormasAr } from "../../../i18n/arabe";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

const HORAS: FormasAr = { uno: "ساعة واحدة", dos: "ساعتين", pocos: "{n} ساعات", muchos: "{n} ساعة", otros: "{n} ساعة" };

export const contenidoAr: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const h = (x: number) => pluralAr(Math.round(x), HORAS, n(x));
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "حاسبة ساعات العمل",
    title: tituloQueEntre(`حاسبة ساعات العمل في ${ctx.nombrePais}`, `ساعات العمل في ${ctx.nombrePais}`, "حاسبة ساعات العمل"),
    description: "اجمع ساعات عملك هذا الأسبوع من وقت البدء ووقت الانتهاء والاستراحات، واحسب أجرك مع العمل الإضافي.",
    intro: [
      "اختر وقت البدء ووقت الانتهاء لكل يوم، ومدة الاستراحة غير المدفوعة، وأجرك بالساعة. تظهر لك الساعات الكلية والساعات الإضافية وأجرك عن الأسبوع.",
      "استخدمها لمراجعة راتبك أو لملء كشف الدوام أو لإعداد فاتورة عمل بالساعة.",
    ],
    comoSeCalcula: [
      "ساعات اليوم = وقت الانتهاء − وقت البدء − الاستراحة. إذا كان الانتهاء قبل البدء فالمناوبة تنتهي في اليوم التالي.",
      "الساعات الإضافية = مجموع الأسبوع − الساعات العادية، حين يتجاوزها المجموع.",
      "الأجر = الساعات العادية × الأجر بالساعة + الساعات الإضافية × الأجر بالساعة × (1 + العلاوة).",
    ],
    ejemplo: [
      `العمل من ${hora("09:00")} إلى ${hora("17:30")} مع استراحة 30 دقيقة يساوي ${h(jornada)} في اليوم. من الاثنين إلى الجمعة ${h(jornada * 5)}، وبأجر ${m(pago)} للساعة يصبح الأجر ${m(jornada * 5 * pago)}.`,
      `العمل من ${hora("08:00")} إلى ${hora("18:00")} مع استراحة ساعة يساوي ${h(larga * 5)} في الأسبوع، منها ${h(extra)} إضافية. بأجر الساعة ونصفه يصبح الأجر ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "كيف أحسب ساعات العمل؟",
        respuesta: "اطرح وقت البدء من وقت الانتهاء ثم اطرح الاستراحة، وبعد ذلك اجمع كل أيام الأسبوع.",
      },
      {
        pregunta: "كيف أحوّل الدقائق إلى ساعات عشرية؟",
        respuesta: `اقسم الدقائق على 60. نصف الساعة يساوي ${n(0.5, 1)}، و15 دقيقة ${n(0.25, 2)}، و45 دقيقة ${n(0.75, 2)}. إذن 7 ساعات و45 دقيقة تساوي ${n(7.75, 2)} ساعة.`,
      },
      {
        pregunta: "كم ساعة إضافية يمكنني أن أعمل وكيف تُدفع؟",
        respuesta: "يعتمد ذلك على قانون العمل في مكان عملك وعلى عقدك. تستخدم هذه الحاسبة العلاوة والساعات العادية التي تدخلها، دون تطبيق قاعدة بعينها.",
      },
    ],
    glosario: [
      { termino: "العمل الإضافي", definicion: "الساعات التي تتجاوز ساعات عملك العادية، وتُدفع بأجر أعلى." },
      { termino: "أجر الساعة ونصفه", definicion: "أجر للعمل الإضافي يساوي مرة ونصف الأجر العادي، أي علاوة 50%." },
    ],
  };
};
