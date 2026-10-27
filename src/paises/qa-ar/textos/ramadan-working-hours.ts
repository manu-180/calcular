import { definirTextos } from "@/motor/edicion";
import ramadan from "../../qa/calculadoras/ramadan-working-hours";

export default definirTextos(ramadan, {
  calculadora: "qa-ar.ramadan-working-hours",
  slug: "ramadan-working-hours",
  campos: {
    inicio: { etiqueta: "وقت بدء العمل" },
    descanso: { etiqueta: "فترة الراحة بالدقائق", ayuda: "فترات الصلاة والراحة وتناول الطعام لا تدخل في ساعات العمل." },
    horasReales: { etiqueta: "الساعات التي تعملها فعلًا في اليوم خلال رمضان" },
    dias: { etiqueta: "أيام العمل في الأسبوع" },
  },
  filas: {
    fin: { etiqueta: "وقت انتهاء الدوام وفق حد رمضان" },
    limiteDia: { etiqueta: "الحد اليومي في رمضان" },
    semana: { etiqueta: "ساعات عملك في الأسبوع" },
    extra: { etiqueta: "الساعات الإضافية في الأسبوع" },
  },
  mensajes: {
    "Enter the hours you work per day.": "أدخل ساعات عملك اليومية.",
    "The Labour Law requires breaks of at least one hour a day, so no one works more than five hours in a row.":
      "يوجب قانون العمل فترة راحة لا تقل عن ساعة في اليوم، حتى لا يعمل أحد أكثر من خمس ساعات متتالية.",
  },
  traducir: (t) => {
    const extra = t.match(/^Hours above the Ramadan limit are overtime, paid at your basic hourly pay plus at least (\d+)%\.$/);
    if (extra) return `الساعات التي تزيد على حد رمضان ساعات إضافية، تُدفع بأجر الساعة الأساسي مع زيادة لا تقل عن ${extra[1]}%.`;
    const max = t.match(/^Total daily work, overtime included, can't normally go over (\d+) hours\.$/);
    if (max) return `لا يجوز عادةً أن يزيد العمل اليومي، بما فيه الساعات الإضافية، على ${max[1]} ساعات.`;
    return undefined;
  },
});
