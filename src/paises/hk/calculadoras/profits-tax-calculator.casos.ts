import { definirCasos } from "@/motor/calculo";
import calculadora from "./profits-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Corporation with $3 million of profits, two-tiered, 2026/27",
    origen: {
      tipo: "recalculado",
      detalle: "8.25% x 2,000,000 = 165,000 + 16.5% x 1,000,000 = 165,000. Total 330,000. Single rate would be 495,000.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", beneficio: 3000000, tipo: "corporation", dosTramos: true },
    esperado: { impuesto: 330000, aPagar: 330000, ahorro: 165000 },
  },
  {
    nombre: "Sole proprietor with $500,000, 2025/26 with the reduction",
    origen: {
      tipo: "recalculado",
      detalle: "7.5% x 500,000 = 37,500, less the 2025/26 reduction capped at 3,000 = 34,500.",
    },
    fecha: "2026-10-16",
    entrada: { anio: "2025-26", beneficio: 500000, tipo: "unincorporated", dosTramos: true },
    esperado: { impuesto: 37500, reduccion: 3000, aPagar: 34500 },
  },
  {
    nombre: "Corporation without the two-tiered rates",
    origen: { tipo: "recalculado", detalle: "16.5% x 1,000,000 = 165,000." },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", beneficio: 1000000, tipo: "corporation", dosTramos: false },
    esperado: { aPagar: 165000, ahorro: 0 },
  },
  {
    nombre: "No profits is not valid",
    origen: { tipo: "recalculado", detalle: "Profits 0." },
    fecha: "2026-10-16",
    entrada: { anio: "2026-27", beneficio: 0, tipo: "corporation", dosTramos: true },
    esperaError: true,
  },
]);
