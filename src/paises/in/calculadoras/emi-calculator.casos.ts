import { definirCasos } from "@/motor/calculo";
import calculadora from "./emi-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹10 lakh at 9% for 5 years",
    origen: { tipo: "recalculado", detalle: "r = 0.0075, n = 60: EMI = P × r × (1 + r)^60 / ((1 + r)^60 − 1) = 20,758.36; total 12,45,501.31." },
    fecha: "2026-10-15",
    entrada: { monto: 1000000, tasa: 9, anios: 5, meses: 0 },
    esperado: { emi: 20758.36, interes: 245501.31, total: 1245501.31, interesAnio1: 83270.24, meses: 60 },
  },
  {
    nombre: "Home loan of ₹50 lakh at 8.5% for 20 years",
    origen: { tipo: "recalculado", detalle: "r = 8.5 / 1200, n = 240: EMI 43,391.16; interest 54,13,878.80." },
    fecha: "2026-10-15",
    entrada: { monto: 5000000, tasa: 8.5, anios: 20, meses: 0 },
    esperado: { emi: 43391.16, interes: 5413878.8 },
  },
  {
    nombre: "Interest-free loan",
    origen: { tipo: "recalculado", detalle: "1,20,000 over 12 months at 0% is 10,000 a month." },
    fecha: "2026-10-15",
    entrada: { monto: 120000, tasa: 0, anios: 1, meses: 0 },
    esperado: { emi: 10000, interes: 0 },
  },
  {
    nombre: "Tenure of zero",
    origen: { tipo: "recalculado", detalle: "No EMIs to pay." },
    fecha: "2026-10-15",
    entrada: { monto: 100000, tasa: 9, anios: 0, meses: 0 },
    esperaError: true,
  },
]);
