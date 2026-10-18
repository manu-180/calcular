import { definirCasos } from "@/motor/calculo";
import calculadora from "./estate-tax";

export default definirCasos(calculadora, [
  {
    nombre: "₱12 million estate with a ₱4 million family home",
    origen: { tipo: "recalculado", detalle: "Net estate 12,000,000 − 5,000,000 − 4,000,000 = 3,000,000. Tax 6% = 180,000." },
    fecha: "2026-10-16",
    entrada: { bruto: 12000000, casa: 4000000, otras: 0 },
    esperado: { impuesto: 180000, neto: 3000000, deducciones: 9000000, casa: 4000000 },
  },
  {
    nombre: "Family home above the ₱10 million cap",
    origen: { tipo: "recalculado", detalle: "Home deduction capped at 10,000,000. Net 30,000,000 − 5,000,000 − 10,000,000 − 1,000,000 = 14,000,000. Tax 840,000." },
    fecha: "2026-10-16",
    entrada: { bruto: 30000000, casa: 15000000, otras: 1000000 },
    esperado: { impuesto: 840000, casa: 10000000 },
  },
  {
    nombre: "Small estate pays nothing",
    origen: { tipo: "recalculado", detalle: "4,000,000 is below the 5,000,000 standard deduction." },
    fecha: "2026-10-16",
    entrada: { bruto: 4000000, casa: 0, otras: 0 },
    esperado: { impuesto: 0, neto: 0 },
  },
  {
    nombre: "Home above the estate",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { bruto: 1000000, casa: 2000000, otras: 0 },
    esperaError: true,
  },
]);
