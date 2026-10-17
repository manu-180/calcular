import { definirCasos } from "@/motor/calculo";
import calculadora from "./retirement-savings-account-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "One year on ₦100,000 at 12%",
    origen: { tipo: "recalculado", detalle: "18% × 100,000 = 18,000 a month at 1% a month for 12 months, paid at month end: 228,285.05. Paid in 216,000." },
    fecha: "2026-10-16",
    entrada: { emolumentos: 100000, saldo: 0, anios: 1, retorno: 12, aumento: 0 },
    esperado: { saldo: 228285.05, aportado: 216000, aporteMes: 18000 },
  },
  {
    nombre: "25 years on ₦450,000 with 10% raises",
    origen: { tipo: "recalculado", detalle: "Same rule over 25 years, pay rising 10% a year: balance 342,890,331.33 from 95,593,341.77 paid in." },
    fecha: "2026-10-16",
    entrada: { emolumentos: 450000, saldo: 0, anios: 25, retorno: 12, aumento: 10 },
    esperado: { saldo: 342890331.33, aportado: 95593341.77 },
  },
]);
