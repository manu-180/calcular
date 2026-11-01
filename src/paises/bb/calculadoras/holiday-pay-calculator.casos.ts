import { definirCasos } from "@/motor/calculo";
import calculadora from "./holiday-pay-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Three years of service on Bds$800 a week",
    origen: { tipo: "recalculado", url: "https://labour.gov.bb/wp-content/uploads/2019/10/Fact-Sheet-Holiday-With-Pay-Act-Booklet.pdf", detalle: "3 weeks × 800 = 2,400.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 800, anios: 3 },
    esperado: { semanas: 3, pago: 2400, diaria: 160 },
  },
  {
    nombre: "Six years of service on Bds$800 a week",
    origen: { tipo: "recalculado", detalle: "4 weeks × 800 = 3,200.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 800, anios: 6 },
    esperado: { semanas: 4, pago: 3200 },
  },
  {
    nombre: "Exactly five years",
    origen: { tipo: "recalculado", detalle: "The fifth year already counts for 4 weeks: 4 × 1,000 = 4,000.00." },
    fecha: "2026-10-27",
    entrada: { semanal: 1000, anios: 5 },
    esperado: { semanas: 4, pago: 4000 },
  },
  {
    nombre: "No weekly pay",
    origen: { tipo: "recalculado", detalle: "A zero weekly pay is rejected." },
    fecha: "2026-10-27",
    entrada: { semanal: 0, anios: 2 },
    esperaError: true,
  },
]);
