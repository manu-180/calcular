import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-shilling";

export default definirCasos(calculadora, [
  {
    nombre: "US$100 at the rate of 22 October 2026",
    origen: {
      tipo: "recalculado",
      url: "https://bou.or.ug/interest_rates_exchange_rates",
      detalle: "BoU opening middle rate 4,209.76. 100 × 4,209.76 = 420,976.",
    },
    fecha: "2026-10-24",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { chelines: 420976, dolares: null, tasa: 4209.76, fecha: "2026-10-22" },
  },
  {
    nombre: "Ushs 1,000,000 to dollars",
    origen: { tipo: "recalculado", detalle: "1,000,000 / 4,209.76 = 237.5432 (shown as 237.54)." },
    fecha: "2026-10-24",
    entrada: { monto: 1000000, sentido: "ugx" },
    esperado: { dolares: 237.5432, chelines: null },
    tolerancia: 0.001,
  },
]);
