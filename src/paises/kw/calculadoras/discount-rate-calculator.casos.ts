import { definirCasos } from "@/motor/calculo";
import calculadora from "./discount-rate-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "KD 15,000 over 60 months at 5.5%, cut of 0.25",
    origen: { tipo: "recalculado", detalle: "Instalment P × r / (1 − (1 + r)^−n): 286.517 at 5.5% and 284.790 at 5.25%. −1.727 a month, −103.620 over 60 months. Discount rate 3.5% (CBK, 15.10.2026) to 3.25%." },
    fecha: "2026-10-18",
    entrada: { saldo: 15000, tasa: 5.5, meses: 60, cambio: -0.25 },
    esperado: { actual: 286.517, nueva: 284.79, diferencia: -1.727, total: -103.62, descuento: 3.5, descuentoNuevo: 3.25 },
  },
  {
    nombre: "KD 50,000 over 120 months, rise of 0.5",
    origen: { tipo: "recalculado", detalle: "555.103 at 6% and 567.740 at 6.5%: +12.637 a month." },
    fecha: "2026-10-18",
    entrada: { saldo: 50000, tasa: 6, meses: 120, cambio: 0.5 },
    esperado: { diferencia: 12.637, nuevaTasa: 6.5 },
  },
  {
    nombre: "Zero balance",
    origen: { tipo: "recalculado", detalle: "A balance of 0 is not valid." },
    fecha: "2026-10-18",
    entrada: { saldo: 0, tasa: 5, meses: 60, cambio: 0 },
    esperaError: true,
  },
]);
