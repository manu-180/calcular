import { definirCasos } from "@/motor/calculo";
import calculadora from "./unemployment-benefit";

export default definirCasos(calculadora, [
  {
    nombre: "أجر 5,200 جنيه، 12 أسبوعًا",
    origen: { tipo: "recalculado", detalle: "الأجر الأسبوعي 5,200 × 12 ÷ 52 = 1,200. أربعة أسابيع × 75% + أربعة × 65% + أربعة × 55% = 4,800 × 1.95 = 9,360." },
    fecha: "2026-10-24",
    entrada: { salario: 5200, meses: 30, primeraVez: true },
    esperado: { total: 9360, semanas: 12, semanal: 1200, primerTramo: 900, ultimoTramo: 660 },
  },
  {
    nombre: "أول تعطل بعد 48 شهرًا: 28 أسبوعًا",
    origen: { tipo: "recalculado", detalle: "1,200 أسبوعيًا: 4 × 900 + 4 × 780 + 4 × 660 + 16 × 540 = 3,600 + 3,120 + 2,640 + 8,640 = 18,000." },
    fecha: "2026-10-24",
    entrada: { salario: 5200, meses: 48, primeraVez: true },
    esperado: { total: 18000, semanas: 28, ultimoTramo: 540 },
  },
  {
    nombre: "اشتراك أقل من سنة",
    origen: { tipo: "recalculado", detalle: "المادة 87 تشترط سنة اشتراك على الأقل." },
    fecha: "2026-10-24",
    entrada: { salario: 5200, meses: 8, primeraVez: true },
    esperado: { total: 0 },
  },
]);
