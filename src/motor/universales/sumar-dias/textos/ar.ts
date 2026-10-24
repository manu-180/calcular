import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosAr: TextosUi<UiSumarDias> = textosArabes({
  slug: "add-days-to-date",
  ui: () => ({
    fecha: "تاريخ البداية",
    operacion: "العملية",
    sumar: "إضافة أيام",
    restar: "طرح أيام",
    dias: "عدد الأيام",
    tipo: "نوع الأيام",
    corridos: "أيام تقويمية",
    habiles: "أيام عمل (من الاثنين إلى الجمعة)",
    resultado: "التاريخ الناتج",
    diaSemana: "يوم الأسبوع",
    diasCorridos: "إجمالي الأيام التقويمية",
    nombresDias: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"],
    errorDias: "يجب أن يكون عدد الأيام عددًا صحيحًا، وبحد أقصى 100 سنة.",
    notaHabiles:
      "أيام العمل هنا تتخطى السبت والأحد ولا تتخطى العطلات الرسمية. وفي كثير من الدول العربية تكون العطلة الأسبوعية الجمعة والسبت، فراجع النتيجة إذا كانت هذه حالتك، وأضف أي عطلة رسمية تقع في المدة.",
  }),
});
