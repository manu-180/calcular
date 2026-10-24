import { definirCasos } from "@/motor/calculo";
import calculadora from "./dollar-to-shilling";

export default definirCasos(calculadora, [
  {
    "nombre": "US$100 at the BoT rate of 17 October 2026",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.bot.go.tz/ExchangeRate/excRates",
      "detalle": "100 × 2,633.1199 = 263,311.99."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "monto": 100,
      "sentido": "usd"
    },
    "esperado": {
      "chelines": 263311.99,
      "tasa": 2633.1199,
      "fecha": "2026-10-17"
    }
  },
  {
    "nombre": "TSh 1,000,000 to dollars",
    "origen": {
      "tipo": "recalculado",
      "detalle": "1,000,000 / 2,633.1199 = 379.78."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "monto": 1000000,
      "sentido": "tzs"
    },
    "esperado": {
      "dolares": 379.78
    }
  },
]);
