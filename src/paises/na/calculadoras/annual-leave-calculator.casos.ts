import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Five-day week, full cycle",
    origen: { tipo: "recalculado", detalle: "Section 23(2): 4 weeks × 5 days = 20 working days (the Act's table gives 20 for a five-day week)." },
    fecha: "2026-10-27",
    entrada: { dias: 5, meses: 12, tomados: 0, salario: null },
    esperado: { anual: 20, acumulados: 20, pendientes: 20 },
  },
  {
    nombre: "Six-day week, seven months, five days taken, N$9,000 a month",
    origen: {
      tipo: "recalculado",
      detalle: "24 days × 7 / 12 = 14. Due 14 − 5 = 9. Daily pay 9,000 / (4.333 × 6) = 346.18. Value 9 × 346.18 = 3,115.62.",
    },
    fecha: "2026-10-27",
    entrada: { dias: 6, meses: 7, tomados: 5, salario: 9000 },
    esperado: { anual: 24, acumulados: 14, pendientes: 9, diaria: 346.18, valor: 3115.62 },
  },
  {
    nombre: "Three-day week",
    origen: { tipo: "recalculado", detalle: "The Act's table: 3 days a week gives 12 working days." },
    fecha: "2026-10-27",
    entrada: { dias: 3, meses: 12, tomados: 0, salario: null },
    esperado: { anual: 12 },
  },
]);
