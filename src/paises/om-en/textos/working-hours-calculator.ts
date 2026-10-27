import { definirTextos } from "@/motor/edicion";
import calculadora from "../../om/calculadoras/working-hours-calculator";

export default definirTextos(calculadora, {
  calculadora: "om-en.working-hours-calculator",
  slug: "working-hours-calculator",
  campos: {
    horasDia: { etiqueta: "Actual working hours per day", ayuda: "Not counting the hour for rest and meals." },
    diasSemana: { etiqueta: "Working days per week" },
    ramadan: { etiqueta: "During Ramadan, for a Muslim worker" },
  },
  filas: {
    extra: { etiqueta: "Overtime hours per week" },
    semana: { etiqueta: "Working hours per week" },
    limiteDia: { etiqueta: "Daily limit" },
    limiteSemana: { etiqueta: "Weekly limit" },
  },
  mensajes: {
    "أدخل ساعات العمل في اليوم.": "Enter the working hours per day.",
    "مجموع ساعات العمل الأصلية والإضافية في اليوم أكثر من الحد الأقصى في القانون.": "Normal and overtime hours together are above the daily maximum in the law.",
    "يستحق العامل راحة أسبوعية مدفوعة الأجر لا تقل عن يومين متتاليين، ويجوز جمعها في الأعمال والمناطق التي يحددها الوزير.":
      "Workers get a paid weekly rest of at least two days in a row. It can be grouped together in the jobs and areas the minister sets.",
  },
});
