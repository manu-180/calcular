import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-pay";

export default definirCasos(calculadora, [
  {
    nombre: "ثلاثون يومًا بأجر 12,000 جنيه",
    origen: { tipo: "recalculado", detalle: "الأجر اليومي 400. التعويض 75% = 300 في اليوم × 30 = 9,000." },
    fecha: "2026-10-24",
    entrada: { salario: 12000, dias: 30 },
    esperado: { total: 9000, diaPrimero: 300 },
  },
  {
    nombre: "مئة وعشرون يومًا",
    origen: { tipo: "recalculado", detalle: "الأجر اليومي 400. 90 × 300 + 30 × 340 (85%) = 27,000 + 10,200 = 37,200." },
    fecha: "2026-10-24",
    entrada: { salario: 12000, dias: 120 },
    esperado: { total: 37200, diaResto: 340 },
  },
  {
    nombre: "أجر قريب من الحد الأدنى",
    origen: { tipo: "recalculado", detalle: "75% × 8,000 ÷ 30 = 200، أقل من 7,000 ÷ 30 = 233.33، فيُرفع. 10 × 233.33 = 2,333.33." },
    fecha: "2026-10-24",
    entrada: { salario: 8000, dias: 10 },
    esperado: { total: 2333.33, diaPrimero: 233.33 },
  },
]);
