import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Three weeks of sick leave",
    origen: { tipo: "recalculado", detalle: "Labour Law art. 82: 2 weeks full + 1 week half. Weekly 6,000 ÷ 30 × 7 = 1,400. 2 × 1,400 + 700 = 3,500." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, meses: 24, semanas: 3, metodoSemanal: "30" },
    esperado: { completas: 2, medias: 1, sinPago: 0, pago: 3500 },
  },
  {
    nombre: "Ten weeks of sick leave",
    origen: { tipo: "recalculado", detalle: "2 full + 4 half + 4 unpaid. Weekly 10,400 × 12 ÷ 52 = 2,400. 4,800 + 4,800 = 9,600." },
    fecha: "2026-10-26",
    entrada: { basico: 10400, meses: 36, semanas: 10, metodoSemanal: "52" },
    esperado: { completas: 2, medias: 4, sinPago: 4, pago: 9600 },
  },
  {
    nombre: "Two months of service",
    origen: { tipo: "recalculado", detalle: "Less than three months: no paid sick leave." },
    fecha: "2026-10-26",
    entrada: { basico: 6000, meses: 2, semanas: 1, metodoSemanal: "30" },
    esperado: { pago: 0, sinPago: 1 },
  },
]);
