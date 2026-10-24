import { pluralAr, type FormasAr } from "../../../i18n/arabe";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

const HORAS: FormasAr = { uno: "ساعة واحدة", dos: "ساعتان", pocos: "{n} ساعات", muchos: "{n} ساعة", otros: "{n} ساعة" };

export const contenidoAr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  const horas = Math.round(r.horas);
  return {
    h1: "حاسبة سعر العمل الحر",
    title: tituloQueEntre(`حاسبة سعر الساعة للعمل الحر في ${ctx.nombrePais}`, `سعر العمل الحر في ${ctx.nombrePais}`, "حاسبة سعر العمل الحر"),
    description: "احسب سعر الساعة وسعر اليوم كعامل مستقل من الدخل الذي تريده ومصروفاتك والضرائب والإجازات والساعات القابلة للفوترة.",
    intro: [
      "أكثر خطأ شائع في العمل الحر أن تأخذ الراتب الذي كنت تريده كموظف وتقسمه على 160 ساعة. هذا الحساب يتجاهل الضرائب والمصروفات والإجازات وكل ساعة لا يمكنك فوترتها.",
      "تبدأ هذه الحاسبة من الدخل الصافي الذي تريده، وتخبرك بالسعر الذي يجب أن تطلبه لتصل إليه.",
    ],
    comoSeCalcula: [
      "الفواتير اللازمة = الدخل الصافي ÷ (1 − نسبة الضرائب) + مصروفات العمل.",
      "أيام العمل = 52 أسبوعًا × أيام العمل في الأسبوع − أيام الإجازة.",
      "الساعات القابلة للفوترة في السنة = أيام العمل × الساعات القابلة للفوترة في اليوم.",
      "سعر الساعة = الفواتير اللازمة ÷ الساعات القابلة للفوترة في السنة.",
    ],
    ejemplo: [
      `لتحصل على دخل صافٍ قدره ${m(ingreso)} في السنة، مع مصروفات قدرها ${m(gastos)} وضرائب 25%، تحتاج إلى فواتير بقيمة ${m(r.facturado)}.`,
      `مع 30 يومًا من الإجازة و25 ساعة قابلة للفوترة في الأسبوع، يكون لديك ${pluralAr(horas, HORAS, formatearNumero(ctx, horas))} في السنة، أي سعر ${m(r.hora)} للساعة أو ${m(r.dia)} لليوم.`,
    ],
    faq: [
      {
        pregunta: "كم ساعة في الأسبوع يمكنني فوترتها؟",
        respuesta: "أقل مما تعمل. البحث عن العملاء والبريد الإلكتروني وإعداد الفواتير والتعلم تأخذ وقتًا لا يدفع لك أحد عنه، والمعتاد من 20 إلى 30 ساعة قابلة للفوترة من أصل 40.",
      },
      {
        pregunta: "هل أحاسب بالساعة أم بالمشروع؟",
        respuesta: "الطريقتان تصلحان. حتى لو سعّرت بالمشروع، قدّر عدد الساعات واضربه في هذا السعر حتى لا تخسر.",
      },
      {
        pregunta: "ما نسبة الضرائب التي أستخدمها؟",
        respuesta: "تعتمد على دولتك وطريقة تسجيلك. اجمع ضريبة الدخل واشتراكات التأمينات الاجتماعية إن وُجدت، وإذا لم تكن متأكدًا فاسأل محاسبًا.",
      },
    ],
    glosario: [
      { termino: "الساعات القابلة للفوترة", definicion: "ساعات العمل التي تتقاضى أجرها من العميل." },
      { termino: "الدخل الصافي", definicion: "ما يتبقى لك بعد الضرائب ومصروفات العمل." },
    ],
  };
};
