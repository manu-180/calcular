import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "IPC de septiembre de 2026 a cinco años",
    origen: { tipo: "recalculado", detalle: "2,73 %: 1.000 × 1,0273 = 1.027,3. 1,0273^5 = 1,144159 → 1.144,159; poder 874,004." },
    fecha: "2026-10-24",
    entrada: { importe: 1000, anios: 5 },
    esperado: { haceUnAnio: 1027.3, futuro: 1144.159, poder: 874.004, tasa: 2.73, mes: "2026-09-01" },
    tolerancia: 0.002,
  },
  {
    nombre: "Cero años",
    origen: { tipo: "recalculado", detalle: "Factor 1." },
    fecha: "2026-10-24",
    entrada: { importe: 500, anios: 0 },
    esperado: { futuro: 500, poder: 500 },
  },
]);
