import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Con la tasa de septiembre de 2026",
    origen: { tipo: "recalculado", detalle: "3,2 %: 1.000 × 1,032 = 1.032. A 2 años 1.000 × 1,032² = 1.065,024; poder 1.000 / 1,065024 = 938,946." },
    fecha: "2026-10-26",
    entrada: { importe: 1000, anios: 2 },
    esperado: { tasa: 3.2, haceUnAnio: 1032, futuro: 1065.024, poder: 938.946, mes: "2026-09-01" },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Importe 0." },
    fecha: "2026-10-26",
    entrada: { importe: 0, anios: 1 },
    esperaError: true,
  },
]);
