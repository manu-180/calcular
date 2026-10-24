import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "IPC de septiembre de 2026 (1,9 %)",
    origen: {
      tipo: "oficial",
      url: "https://stats.gov.sa/documents/20117/2435267/CPI-Sep+2026-AR.pdf/fd93e416-f391-e800-8d00-2d42fee60aa2",
      detalle: "GASTAT: 1,9 % interanual. 10.000 x 1,019 = 10.190; 10.000 x 1,019^5 = 10.986,79; 10.000 / 1,019^5 = 9.101,84.",
    },
    fecha: "2026-10-24",
    entrada: { importe: 10000, anios: 5 },
    esperado: { haceUnAnio: 10190, futuro: 10986.79, poder: 9101.84, tasa: 1.9, mes: "2026-09-01" },
  },
  {
    nombre: "Cero años",
    origen: { tipo: "recalculado", detalle: "Factor 1." },
    fecha: "2026-10-24",
    entrada: { importe: 10000, anios: 0 },
    esperado: { futuro: 10000, poder: 10000 },
  },
  {
    nombre: "Importe cero",
    origen: { tipo: "recalculado", detalle: "Importe 0." },
    fecha: "2026-10-24",
    entrada: { importe: 0, anios: 1 },
    esperaError: true,
  },
]);
