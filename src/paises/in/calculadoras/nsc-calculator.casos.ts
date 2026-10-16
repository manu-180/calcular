import { definirCasos } from "@/motor/calculo";
import calculadora from "./nsc-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹1 lakh at 7.7%",
    origen: { tipo: "recalculado", detalle: "1,00,000 × 1.077^5 = 1,44,903.38. Year 1 interest 7,700; year 5 interest 10,359.85." },
    fecha: "2026-10-15",
    entrada: { monto: 100000 },
    esperado: { madurez: 144903.38, interes: 44903.38, anio1: 7700, anio5: 10359.85, tasa: 7.7 },
  },
  {
    nombre: "₹1,000 certificate",
    origen: { tipo: "recalculado", detalle: "1,000 × 1.077^5 = 1,449.03." },
    fecha: "2026-10-15",
    entrada: { monto: 1000 },
    esperado: { madurez: 1449.03 },
  },
  {
    nombre: "Rate on 1 January 2026, before the current quarter",
    origen: { tipo: "recalculado", detalle: "The 7.7% rate has applied since 1 January 2024: same maturity for 1,000." },
    fecha: "2026-01-15",
    entrada: { monto: 1000 },
    esperado: { madurez: 1449.03 },
  },
]);
