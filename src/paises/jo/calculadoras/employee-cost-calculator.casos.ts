import { definirCasos } from "@/motor/calculo";
import calculadora from "./employee-cost-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "800 al mes",
    origen: { tipo: "recalculado", detalle: "Empleador 14,25 % de 800 = 114. Costo 914 por mes, 10.968 al año." },
    fecha: "2026-10-24",
    entrada: { salario: 800, otros: 0 },
    esperado: { ssc: 114, mensual: 914, anual: 10968, tasa: 14.25, sobreSalario: 14.25 },
  },
  {
    nombre: "Con otros costos",
    origen: { tipo: "recalculado", detalle: "1.000 + 142,5 + 50 = 1.192,5." },
    fecha: "2026-10-24",
    entrada: { salario: 1000, otros: 50 },
    esperado: { ssc: 142.5, mensual: 1192.5 },
  },
  {
    nombre: "Por encima del tope",
    origen: { tipo: "recalculado", detalle: "14,25 % de 3.733 = 531,9525. Costo 4.000 + 531,953 = 4.531,953." },
    fecha: "2026-10-24",
    entrada: { salario: 4000, otros: 0 },
    esperado: { mensual: 4531.953 },
    tolerancia: 0.002,
  },
  {
    nombre: "Sin salario",
    origen: { tipo: "recalculado", detalle: "Salario 0." },
    fecha: "2026-10-24",
    entrada: { salario: 0, otros: 0 },
    esperaError: true,
  },
]);
