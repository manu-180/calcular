import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-service-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Cinco años sin seguro social",
    origen: { tipo: "recalculado", detalle: "1/1/2021 a 1/1/2026: 1.826 días = 5,00274 años × 1 mes × 600 = 3.001,644." },
    fecha: "2026-10-24",
    entrada: { salario: 600, inicio: "2021-01-01", fin: "2026-01-01", ssc: false },
    esperado: { dias: 1826, monto: 3001.644, anios: 5 },
  },
  {
    nombre: "Fracción de año",
    origen: { tipo: "recalculado", detalle: "1/1/2026 a 2/7/2026: 182 días = 0,49863 años × 800 = 398,904." },
    fecha: "2026-10-24",
    entrada: { salario: 800, inicio: "2026-01-01", fin: "2026-07-02", ssc: false },
    esperado: { dias: 182, monto: 398.904 },
  },
  {
    nombre: "Con seguro social",
    origen: { tipo: "recalculado", detalle: "Art. 32: solo para quien no está bajo la ley de seguridad social. Monto 0." },
    fecha: "2026-10-24",
    entrada: { salario: 600, inicio: "2021-01-01", fin: "2026-01-01", ssc: true },
    esperado: { monto: 0, meses: 0 },
  },
  {
    nombre: "Fechas invertidas",
    origen: { tipo: "recalculado", detalle: "Fin antes del inicio." },
    fecha: "2026-10-24",
    entrada: { salario: 600, inicio: "2026-01-01", fin: "2025-01-01", ssc: false },
    esperaError: true,
  },
]);
