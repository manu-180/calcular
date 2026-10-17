import { definirCasos } from "@/motor/calculo";
import calculadora from "./fixed-deposit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₦1 million for 90 days at 15%",
    origen: { tipo: "recalculado", detalle: "1,000,000 × 15% × 90 / 365 = 36,986.30." },
    fecha: "2026-10-16",
    entrada: { monto: 1000000, tasa: 15, dias: 90, renovaciones: 0 },
    esperado: { madurez: 1036986.3, interes: 36986.3, dias: 90 },
  },
  {
    nombre: "Rolled over three times",
    origen: { tipo: "recalculado", detalle: "Four tenors of 90 days, each on the new balance: 1,000,000 × (1 + 0.15 × 90 / 365)^4 = 1,156,357.38." },
    fecha: "2026-10-16",
    entrada: { monto: 1000000, tasa: 15, dias: 90, renovaciones: 3 },
    esperado: { madurez: 1156357.38, dias: 360 },
  },
]);
