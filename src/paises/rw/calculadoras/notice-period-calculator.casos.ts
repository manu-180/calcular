import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Two years of service, dismissed by the employer",
    origen: { tipo: "recalculado", detalle: "More than one year: at least 30 days. 300,000 ÷ 30 × 30 = 300,000. One day off a week: 4 days." },
    fecha: "2026-10-26",
    entrada: { meses: 24, salario: 300000, quien: "employer", prueba: false },
    esperado: { dias: 30, salarioPreaviso: 300000, diasBusqueda: 4 },
  },
  {
    nombre: "Eight months of service, employee resigns",
    origen: { tipo: "recalculado", detalle: "Less than one year: at least 15 days. 240,000 ÷ 30 × 15 = 120,000. No job-search days when the employee resigns." },
    fecha: "2026-10-26",
    entrada: { meses: 8, salario: 240000, quien: "employee", prueba: false },
    esperado: { dias: 15, salarioPreaviso: 120000, diasBusqueda: 0 },
  },
  {
    nombre: "On probation",
    origen: { tipo: "recalculado", detalle: "Article 24: no notice during probation." },
    fecha: "2026-10-26",
    entrada: { meses: 2, salario: 200000, quien: "employer", prueba: true },
    esperado: { dias: 0, salarioPreaviso: 0 },
  },
]);
