import { definirCasos } from "@/motor/calculo";
import overtimeCalculator from "./overtime-calculator";

export default definirCasos(overtimeCalculator, [
  {
    "nombre": "Eight hours beyond the limit at BZ$10",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "Ordinary rate 10 x 1.5 = 15 an hour; 8 hours = 120; extra over ordinary = 40."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 10,
      "base": "hora",
      "tipo": "exceso",
      "horas": 8
    },
    "esperado": {
      "ordinaria": 10,
      "tarifa": 15,
      "total": 120,
      "extra": 40
    }
  },
  {
    "nombre": "Good Friday on a BZ$900 monthly wage",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "900 x 12 / 52 / 45 = 4.62; double = 9.24; 8 hours = 73.92; extra = 73.92 - 36.96."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 900,
      "base": "mes",
      "tipo": "doble",
      "horas": 8
    },
    "esperado": {
      "ordinaria": 4.62,
      "tarifa": 9.24,
      "total": 73.92,
      "extra": 36.96
    }
  },
  {
    "nombre": "Sunday work on a weekly wage",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.ruraltransformation.gov.bz/docs/39/Labour_Act.pdf",
      "detalle": "450 / 45 = 10 an hour; x 1.5 = 15; 4 hours = 60."
    },
    "fecha": "2026-10-29",
    "entrada": {
      "monto": 450,
      "base": "semana",
      "tipo": "descanso",
      "horas": 4
    },
    "esperado": {
      "ordinaria": 10,
      "total": 60
    }
  }
]);
