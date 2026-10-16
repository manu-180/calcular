import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

export default definirCasos(calculadora, [
  {
    nombre: "Minimum wage in October 2026",
    origen: { tipo: "recalculado", detalle: "70,000 a month; 840,000 a year." },
    fecha: "2026-10-16",
    entrada: { sueldo: null },
    esperado: { mensual: 70000, anual: 840000, diferencia: null },
  },
  {
    nombre: "Pay of ₦85,000",
    origen: { tipo: "recalculado", detalle: "85,000 − 70,000 = 15,000 above the minimum." },
    fecha: "2026-10-16",
    entrada: { sueldo: 85000 },
    esperado: { diferencia: 15000 },
  },
]);
