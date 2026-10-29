import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K500,000 pensionable pay",
    origen: { tipo: "recalculado", detalle: "Pension Act 2023, s. 12: 5% employee = 25,000; 10% employer = 50,000. Total 75,000." },
    fecha: "2026-10-27",
    entrada: { pensionable: 500000 },
    esperado: { total: 75000, empleado: 25000, empleador: 50000, anual: 900000 },
  },
  {
    nombre: "K126,000.50",
    origen: { tipo: "recalculado", detalle: "5% = 6,300.025, rounded to 6,300.03; 10% = 12,600.05. Total 18,900.08." },
    fecha: "2026-10-27",
    entrada: { pensionable: 126000.5 },
    esperado: { empleado: 6300.03, empleador: 12600.05, total: 18900.08 },
  },
  {
    nombre: "Zero pay is rejected",
    origen: { tipo: "recalculado", detalle: "Pensionable pay has to be above zero." },
    fecha: "2026-10-27",
    entrada: { pensionable: 0 },
    esperaError: true,
  },
]);
