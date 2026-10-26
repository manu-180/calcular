import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension";

export default definirCasos(calculadora, [
  {
    nombre: "ثلاثون سنة بأجر تسوية 9,000 جنيه",
    origen: { tipo: "recalculado", detalle: "المادة 24: 9,000 × 30 ÷ 45 = 6,000، أي 66.7% من أجر التسوية، وهو أقل من حد 80%." },
    fecha: "2026-10-24",
    entrada: { salario: 9000, anios: 30, meses: 0 },
    esperado: { pension: 6000, calculado: 6000, limite: null },
  },
  {
    nombre: "أربعون سنة: يطبق حد 80%",
    origen: { tipo: "recalculado", detalle: "10,000 × 40 ÷ 45 = 8,888.89، والحد الأقصى 80% × 10,000 = 8,000." },
    fecha: "2026-10-24",
    entrada: { salario: 10000, anios: 40, meses: 0 },
    esperado: { pension: 8000, calculado: 8888.89 },
  },
  {
    nombre: "أجر منخفض: يرفع إلى الحد الأدنى",
    origen: { tipo: "recalculado", detalle: "3,000 × 15 ÷ 45 = 1,000، والحد الأدنى 65% × 2,700 = 1,755." },
    fecha: "2026-10-24",
    entrada: { salario: 3000, anios: 15, meses: 0 },
    esperado: { pension: 1755, calculado: 1000 },
  },
  {
    nombre: "مدة أقل من 180 شهرًا",
    origen: { tipo: "recalculado", detalle: "عشر سنوات = 120 شهرًا، أقل من 180 شهرًا اللازمة منذ 2025. لا معاش." },
    fecha: "2026-10-24",
    entrada: { salario: 6000, anios: 10, meses: 0 },
    esperado: { pension: 0 },
  },
]);
