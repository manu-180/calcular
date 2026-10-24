import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Monthly employee",
    "origen": {
      "tipo": "recalculado",
      "url": "https://commons.laws.africa/akn/tz/act/2004/6/media/publication/tz-act-2004-6-publication-document.pdf",
      "detalle": "28 days. Pay in lieu 1,000,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "pago": "monthly",
      "primerMes": false,
      "sueldo": 1000000,
      "diario": null
    },
    "esperado": {
      "dias": 28,
      "enLugar": 1000000
    }
  },
  {
    "nombre": "Weekly employee",
    "origen": {
      "tipo": "recalculado",
      "detalle": "4 days × 30,000 = 120,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "pago": "daily-weekly",
      "primerMes": false,
      "sueldo": null,
      "diario": 30000
    },
    "esperado": {
      "dias": 4,
      "enLugar": 120000
    }
  },
  {
    "nombre": "First month of employment",
    "origen": {
      "tipo": "recalculado",
      "detalle": "7 days. Monthly wage 1,000,000 / 28 × 7 = 250,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "pago": "monthly",
      "primerMes": true,
      "sueldo": 1000000,
      "diario": null
    },
    "esperado": {
      "dias": 7,
      "enLugar": 250000
    }
  },
]);
