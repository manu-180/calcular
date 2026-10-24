import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-pay";

export default definirCasos(calculadora, [
  {
    nombre: "Twenty days from the start of the year",
    origen: { tipo: "recalculado", detalle: "Article 31: 15 days full pay + 5 at half pay. 9,000 / 30 = 300: 4,500 + 750 = 5,250." },
    fecha: "2026-10-17",
    entrada: { salario: 9000, previos: 0, dias: 20, prueba: false, metodoDiario: "30" },
    esperado: { completos: 15, medios: 5, sinPaga: 0, pago: 5250 },
  },
  {
    nombre: "Ten more days after 40 already taken",
    origen: { tipo: "recalculado", detalle: "Days 41 to 45 at half pay (5), days 46 to 50 unpaid (5). 5 x 150 = 750." },
    fecha: "2026-10-17",
    entrada: { salario: 9000, previos: 40, dias: 10, prueba: false, metodoDiario: "30" },
    esperado: { completos: 0, medios: 5, sinPaga: 5, pago: 750 },
  },
  {
    nombre: "On probation: unpaid",
    origen: { tipo: "recalculado", detalle: "No paid sick leave during the probation period." },
    fecha: "2026-10-17",
    entrada: { salario: 9000, previos: 0, dias: 5, prueba: true, metodoDiario: "30" },
    esperado: { pago: 0, sinPaga: 5 },
  },
]);
