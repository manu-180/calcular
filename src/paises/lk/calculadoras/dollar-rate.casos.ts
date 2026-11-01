import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-rate";

export default definirCasos(calculadora, [
  {
    nombre: "US$ 100 on 26 October 2026",
    origen: {
      tipo: "oficial",
      url: "https://www.cbsl.gov.lk/en/rates-and-indicators/exchange-rates/daily-indicative-usd-spot-exchange-rates",
      detalle: "CBSL indicative USD/LKR spot rate on 2026-10-26: 332.2320. 100 × 332.2320 = 33,223.20.",
    },
    fecha: "2026-10-26",
    entrada: { monto: 100, sentido: "usd" },
    esperado: { rupias: 33223.2, tasa: 332.232, fecha: "2026-10-26" },
  },
  {
    nombre: "Rs. 100,000 on 23 October 2026",
    origen: { tipo: "recalculado", detalle: "Rate 332.0250. 100,000 / 332.025 = 301.18." },
    fecha: "2026-10-23",
    entrada: { monto: 100000, sentido: "lkr" },
    esperado: { dolares: 301.18 },
  },
]);
