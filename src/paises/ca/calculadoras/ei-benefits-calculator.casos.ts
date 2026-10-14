import { definirCasos } from "@/motor/calculo";
import calculadora from "./ei-benefits-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "$1,000 a week for 20 weeks",
    "origen": {
      "tipo": "recalculado",
      "detalle": "1,000 × 55% = 550; × 20 = 11,000."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "semanal": 1000,
      "semanas": 20
    },
    "esperado": {
      "semanal": 550,
      "total": 11000
    }
  },
  {
    "nombre": "Above the maximum",
    "origen": {
      "tipo": "recalculado",
      "detalle": "1,600 × 55% = 880, capped at 729."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "semanal": 1600,
      "semanas": 10
    },
    "esperado": {
      "semanal": 729,
      "total": 7290
    }
  },
  {
    "nombre": "Zero earnings",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Weekly earnings must be above zero."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "semanal": 0,
      "semanas": 10
    },
    "esperaError": true
  }
]);
