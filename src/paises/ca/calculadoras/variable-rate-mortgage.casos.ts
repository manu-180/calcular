import { definirCasos } from "@/motor/calculo";
import calculadora from "./variable-rate-mortgage";

export default definirCasos(calculadora, [
  {
    "nombre": "$500,000, 25 years, prime minus 0.5",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Prime 4.45 (week of 2026-10-07) − 0.5 = 3.95%. r = 0.0395/12; payment = 500,000 × r / (1 − (1 + r)^−300) = 2,625.40."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "prestamo": 500000,
      "anios": 25,
      "margen": -0.5
    },
    "esperado": {
      "pago": 2625.4,
      "tasa": 3.95,
      "prime": 4.45,
      "politica": 2.25
    }
  },
  {
    "nombre": "No loan amount",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Amount must be above zero."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "prestamo": 0,
      "anios": 25,
      "margen": 0
    },
    "esperaError": true
  }
]);
