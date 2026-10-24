import { textosArabes } from "../../comun/arabe";
import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosAr: TextosUi<UiConversorSueldo> = textosArabes({
  slug: "hourly-to-salary",
  ui: () => ({
    monto: "الأجر",
    periodo: "الأجر محسوب عن كل",
    hora: "ساعة",
    dia: "يوم",
    semana: "أسبوع",
    quincena: "نصف شهر (24 مرة في السنة)",
    mes: "شهر",
    anio: "سنة",
    horasSemana: "ساعات العمل في الأسبوع",
    diasSemana: "أيام العمل في الأسبوع",
    semanasAnio: "الأسابيع المدفوعة في السنة",
    semanasAnioAyuda: "52 إذا كانت إجازتك مدفوعة الأجر. وإذا كنت تتقاضى أجر الأسابيع التي تعمل فيها فقط، فاطرح الباقي.",
    porHora: "الأجر بالساعة",
    porDia: "الأجر اليومي",
    porSemana: "الأجر الأسبوعي",
    porQuincena: "الأجر نصف الشهري",
    porMes: "الراتب الشهري",
    porAnio: "الراتب السنوي",
    errorHoras: "أدخل عدد ساعات عملك في الأسبوع.",
    errorSemanas: "يجب أن يكون عدد الأسابيع المدفوعة في السنة أكبر من صفر.",
    observacionBruto: "هو المبلغ نفسه معروضًا لفترات أخرى، دون إضافة المكافآت ودون خصم الضرائب.",
  }),
});
