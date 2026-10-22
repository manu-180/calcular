import { definirCasos } from "@/motor/calculo";
import calculadora from "./zakat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Rs. 600,000 in the bank",
    origen: { tipo: "recalculado", detalle: "600,000 is above the nisab of 503,529: 2.5% = 15,000." },
    fecha: "2026-10-17",
    entrada: { efectivo: 600000, oro: 0, inversiones: 0, deudas: 0 },
    esperado: { zakat: 15000, estado: "At or above the nisab" },
  },
  {
    nombre: "Below the nisab",
    origen: { tipo: "recalculado", detalle: "400,000 is below 503,529: no zakat." },
    fecha: "2026-10-17",
    entrada: { efectivo: 400000, oro: 0, inversiones: 0, deudas: 0 },
    esperado: { zakat: 0, estado: "Below the nisab" },
  },
  {
    nombre: "Gold and savings less debts",
    origen: { tipo: "recalculado", detalle: "300,000 + 900,000 + 200,000 − 400,000 = 1,000,000 × 2.5% = 25,000." },
    fecha: "2026-10-17",
    entrada: { efectivo: 300000, oro: 900000, inversiones: 200000, deudas: 400000 },
    esperado: { zakat: 25000, neto: 1000000 },
  },
]);
