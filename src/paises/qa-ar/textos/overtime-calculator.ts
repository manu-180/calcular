import { definirTextos } from "@/motor/edicion";
import overtime from "../../qa/calculadoras/overtime-calculator";

export default definirTextos(overtime, {
  calculadora: "qa-ar.overtime-calculator",
  slug: "overtime-calculator",
  campos: {
    basico: { etiqueta: "الراتب الأساسي الشهري" },
    horasSemana: { etiqueta: "ساعات العمل العادية في الأسبوع", ayuda: "من عقدك. يسمح القانون بما لا يزيد على 48 ساعة." },
    extra: { etiqueta: "الساعات الإضافية (نهارًا)" },
    nocturnas: { etiqueta: "الساعات الإضافية بين التاسعة مساءً والثالثة صباحًا" },
    turnos: { etiqueta: "تعمل بنظام المناوبة", ayuda: "زيادة العمل الليلي الأعلى لا تسري على عمال المناوبة." },
  },
  filas: {
    total: { etiqueta: "أجر الساعات الإضافية" },
    diurno: { etiqueta: "أجر الساعات الإضافية النهارية" },
    nocturno: { etiqueta: "أجر الساعات الإضافية الليلية" },
    hora: { etiqueta: "الأجر الأساسي للساعة" },
  },
  mensajes: {
    "Enter your monthly basic salary.": "أدخل راتبك الأساسي الشهري.",
    "As a shift worker, your night hours are paid at the normal overtime rate.": "بما أنك من عمال المناوبة، تُدفع ساعاتك الليلية بزيادة العمل الإضافي العادية.",
  },
  traducir: (t) => {
    const m = t.match(/^Daily work, overtime included, can't go over (\d+) hours except to prevent serious loss or a serious accident\.$/);
    return m ? `لا يجوز أن يزيد العمل اليومي، بما فيه الساعات الإضافية، على ${m[1]} ساعات، إلا لمنع خسارة جسيمة أو حادث خطير.` : undefined;
  },
});
