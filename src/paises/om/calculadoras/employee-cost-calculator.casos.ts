import { definirCasos } from "@/motor/calculo";
import calculadora from "./employee-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Omaní con 800 de salario",
    origen: { tipo: "recalculado", detalle: "Aportes del empleador 14,5 % de 800 = 116. Costo 916 por mes, 10.992 por año." },
    fecha: "2026-10-26",
    entrada: { salario: 800, nacionalidad: "omani", otros: 0 },
    esperado: { aportes: 116, mensual: 916, anual: 10992, porcentaje: 14.5 },
  },
  {
    nombre: "Extranjero con otros costos",
    origen: { tipo: "recalculado", detalle: "Sin aportes. 800 + 50 = 850." },
    fecha: "2026-10-26",
    entrada: { salario: 800, nacionalidad: "expat", otros: 50 },
    esperado: { aportes: 0, mensual: 850 },
  },
]);
