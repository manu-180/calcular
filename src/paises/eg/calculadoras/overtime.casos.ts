import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime";

export default definirCasos(calculadora, [
  {
    nombre: "أجر 9,600 جنيه وعشر ساعات نهارية",
    origen: { tipo: "recalculado", detalle: "أجر الساعة 9,600 ÷ 30 ÷ 8 = 40. عشر ساعات × 40 × 1.35 = 540." },
    fecha: "2026-10-24",
    entrada: { base: "mensual", salario: 9600, horasDia: 8, valorHora: null, horasDiurnas: 10, horasNocturnas: 0, diasDescanso: 0 },
    esperado: { total: 540, valorHora: 40 },
  },
  {
    nombre: "أجر ساعة 50 جنيهًا مع ساعات ليلية ويوم راحة",
    origen: { tipo: "recalculado", detalle: "ليلي: 4 × 50 × 1.70 = 340. يوم راحة: 50 × 8 = 400. نهاري: 2 × 50 × 1.35 = 135. الإجمالي 875." },
    fecha: "2026-10-24",
    entrada: { base: "hora", salario: null, horasDia: null, valorHora: 50, horasDiurnas: 2, horasNocturnas: 4, diasDescanso: 1 },
    esperado: { total: 875, nocturno: 340, descanso: 400, diurno: 135 },
  },
]);
