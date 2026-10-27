import { definirTextos } from "@/motor/edicion";
import pension from "../../qa/calculadoras/pension-calculator";

export default definirTextos(pension, {
  calculadora: "qa-ar.pension-calculator",
  slug: "pension-calculator",
  campos: {
    salario: { etiqueta: "راتب حساب المعاش الشهري", ayuda: "في القطاع الخاص: متوسط راتب حساب الاشتراك في آخر ثلاث سنوات. في القطاع الحكومي: آخر راتب لحساب الاشتراك." },
    anios: { etiqueta: "سنوات الاشتراك" },
    edad: { etiqueta: "عمرك عند انتهاء الخدمة" },
    motivo: { etiqueta: "سبب انتهاء الخدمة", opciones: { edad: "بلوغ سن التقاعد", renuncia: "الاستقالة" } },
    sexo: { etiqueta: "الجنس", opciones: { hombre: "ذكر", mujer: "أنثى" } },
  },
  filas: {
    pension: { etiqueta: "المعاش الشهري" },
    bruta: { etiqueta: "المعاش قبل أي تخفيض" },
    reduccion: { etiqueta: "التخفيض بسبب ترك الخدمة مبكرًا" },
    desde: { etiqueta: "السن التي يبدأ فيها صرف المعاش" },
  },
  mensajes: {
    "Enter your pension salary.": "أدخل راتب حساب المعاش.",
    "Without a pension you can ask for a lump-sum compensation if you contributed for more than a year.": "إذا لم تستحق معاشًا، يحق لك طلب تعويض الدفعة الواحدة متى زادت مدة اشتراكك على سنة.",
    "A pension needs at least 25 years of contributions, including 20 years of actual service.": "يشترط لاستحقاق المعاش ألا تقل مدة الاشتراك عن 25 سنة، منها 20 سنة خدمة فعلية على الأقل.",
    "Retirement age can't be under 60. Choose resignation if you leave earlier.": "لا تقل سن التقاعد عن 60 سنة. اختر الاستقالة إذا تركت الخدمة قبل ذلك.",
    "After resigning under 50, the pension is paid from age 50.": "عند الاستقالة قبل سن الخمسين، لا يُصرف المعاش إلا عند بلوغها.",
    "This assumes all your contribution years are actual service. GRSIA works out the official amount.": "تفترض الحاسبة أن كل سنوات اشتراكك خدمة فعلية. والهيئة هي التي تحدد المبلغ الرسمي.",
  },
});
