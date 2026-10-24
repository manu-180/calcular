import { definirCasos } from "@/motor/calculo";
import calculadora from "./nssf-pension-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "300 contributions on TSh 18 million a year",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.nssf.go.tz/benefits/old-age-pension",
      "detalle": "Annual pension 300 × 18,000,000 / 580 = 9,310,344.83. Monthly 67% / 12 = 519,827.59. Lump sum × 12.5 × 33% = 38,405,172.41."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ape": 18000000,
      "cotizaciones": 300
    },
    "esperado": {
      "mensual": 519827.59,
      "sumaInicial": 38405172.41,
      "anual": 9310344.83
    }
  },
  {
    "nombre": "Capped at 72.5%",
    "origen": {
      "tipo": "recalculado",
      "detalle": "500 contributions give 15,517,241.38, capped at 13,050,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ape": 18000000,
      "cotizaciones": 500
    },
    "esperado": {
      "anual": 13050000,
      "mensual": 728625
    }
  },
  {
    "nombre": "Too few contributions",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Fewer than 180."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "ape": 18000000,
      "cotizaciones": 120
    },
    "esperaError": true
  },
]);
