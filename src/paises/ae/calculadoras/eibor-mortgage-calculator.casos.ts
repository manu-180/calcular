import { definirCasos } from "@/motor/calculo";
import calculadora from "./eibor-mortgage-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "AED 1.5 million over 25 years at EIBOR + 1.5%",
    origen: { tipo: "recalculado", detalle: "CBUAE 3-month EIBOR on 16 October 2026: 4.205%. Plus 1.5% = 5.705% over 300 months: 9,395.85 a month." },
    fecha: "2026-10-19",
    entrada: { prestamo: 1500000, anios: 25, margen: 1.5 },
    esperado: { eibor: 4.205, tasa: 5.705, mensual: 9395.85, total: 2818755 },
  },
  {
    nombre: "Lower EIBOR",
    origen: { tipo: "recalculado", detalle: "EIBOR 3% + 1.5% = 4.5% on 1,000,000 over 240 months: 6,326.49." },
    fecha: "2026-10-19",
    entrada: { prestamo: 1000000, anios: 20, margen: 1.5 },
    valores: { "ae.eibor-3m": { fecha: "2026-10-16", valor: 3 } },
    esperado: { mensual: 6326.49, intereses: 518357.6 },
  },
  {
    nombre: "No loan is not valid",
    origen: { tipo: "recalculado", detalle: "Loan 0." },
    fecha: "2026-10-19",
    entrada: { prestamo: 0, anios: 25, margen: 1.5 },
    esperaError: true,
  },
]);
