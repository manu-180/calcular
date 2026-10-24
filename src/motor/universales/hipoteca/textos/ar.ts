import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosAr: TextosUi<UiHipoteca> = {
  slug: "mortgage",
  ui: () => ({
    precio: "سعر العقار",
    entradaPorcentaje: "الدفعة الأولى (% من السعر)",
    entradaMonto: "مبلغ الدفعة الأولى (اختياري)",
    entradaMontoAyuda: "إذا أدخلته، يُستخدم بدل النسبة المئوية.",
    tasa: "معدل الفائدة السنوي (%)",
    anios: "مدة التمويل بالسنوات",
    gastos: "مصاريف السكن الشهرية (اختياري)",
    gastosAyuda: "ضريبة العقار أو تأمين المنزل أو رسوم الخدمات التي تدفعها مع القسط.",
    cuota: "القسط الشهري للتمويل العقاري",
    cuotaTotal: "القسط الشهري مع المصاريف",
    entrada: "الدفعة الأولى",
    prestado: "مبلغ التمويل",
    intereses: "إجمالي الفوائد",
    total: "إجمالي أقساط التمويل",
    tabla: "سنة بعد سنة",
    colAnio: "السنة",
    colIntereses: "الفوائد المدفوعة",
    colCapital: "الأصل المسدَّد",
    colSaldo: "الرصيد في نهاية السنة",
    errorPrecio: "أدخل سعر العقار.",
    errorEntrada: "الدفعة الأولى تغطي السعر كاملًا، فلا يوجد تمويل لحسابه. اخفض الدفعة الأولى.",
    observacionPrestado: (porcentaje) => `تقترض ${porcentaje}% من قيمة العقار. وكلما ارتفعت هذه النسبة زادت عادة الشروط التي تطلبها جهة التمويل.`,
    observacionCostos: "لا تشمل النتيجة مصاريف الشراء (رسوم التسجيل والضرائب والتقييم). احسب حسابها فوق الدفعة الأولى.",
  }),
};
