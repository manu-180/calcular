import { textosArabes } from "../../comun/arabe";
import { type FormasAr, pluralAr } from "../../../i18n/arabe";
import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

const SEMANAS: FormasAr = { uno: "أسبوع واحد", dos: "أسبوعان", pocos: "{n} أسابيع", muchos: "{n} أسبوعًا", otros: "{n} أسبوع" };
const DIAS: FormasAr = { uno: "يوم واحد", dos: "يومان", pocos: "{n} أيام", muchos: "{n} يومًا", otros: "{n} يوم" };

// Familia de embarazo: se le habla en femenino a la persona gestante (ADR 0002, D10).
export const textosAr: TextosUi<UiFechaDeParto> = textosArabes({
  slug: "due-date",
  ui: () => ({
    metodo: "أي تاريخ تعرفين؟",
    fum: "أول يوم من آخر دورة شهرية",
    concepcion: "تاريخ الإخصاب",
    fecha: "التاريخ",
    fechaAyuda: "إذا اخترتِ آخر دورة شهرية، فأدخلي أول يوم من نزول الدم.",
    ciclo: "طول الدورة (بالأيام)",
    cicloAyuda: "يُستخدم فقط مع آخر دورة شهرية. إذا لم تعرفيه فاتركيه 28.",
    fpp: "موعد الولادة المتوقع",
    edadGestacional: "عمر الحمل اليوم",
    trimestre: "الثلث",
    faltan: "الأيام المتبقية",
    fechaConcepcion: "تاريخ الإخصاب التقريبي",
    semanasYDias: (s, d) => (d ? `${pluralAr(s, SEMANAS)} و${pluralAr(d, DIAS)}` : pluralAr(s, SEMANAS)),
    trimestres: ["الثلث الأول من الحمل", "الثلث الثاني من الحمل", "الثلث الثالث من الحمل"],
    errorFutura: "لا يمكن أن يكون التاريخ بعد اليوم.",
    errorCiclo: "يجب أن يكون طول الدورة بين 20 و45 يومًا.",
    notaPasada: "مرّ أكثر من 42 أسبوعًا على هذا التاريخ، لذلك لا يظهر عمر الحمل.",
    aviso: "هذا تقدير، فقليل من الأطفال يولدون في الموعد المتوقع بالضبط. والفحص بالموجات فوق الصوتية والمتابعة مع طبيبتك أو طبيبك يعطيان التاريخ الأدق، ولا تغني هذه النتيجة عن استشارتهما.",
  }),
});
