import { definirCasos } from "@/motor/calculo";
import calculadora from "./severance-pay";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario, 8 years 9 months",
    "origen": {
      "tipo": "recalculado",
      "detalle": "8 + 9/12 = 8.75 weeks × 1,200 = 10,500."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "anios": 8,
      "meses": 9,
      "semanal": 1200,
      "diasSemana": 5,
      "nominaGrande": true
    },
    "esperado": {
      "pago": 10500,
      "semanas": 8.75
    }
  },
  {
    "nombre": "Ontario, 30 years capped",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Capped at 26 weeks × 1,000."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "anios": 30,
      "meses": 0,
      "semanal": 1000,
      "diasSemana": 5,
      "nominaGrande": true
    },
    "esperado": {
      "semanas": 26,
      "pago": 26000
    }
  },
  {
    "nombre": "Ontario, small employer",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Payroll under $2.5 million: no ESA severance."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "anios": 10,
      "meses": 0,
      "semanal": 1000,
      "diasSemana": 5,
      "nominaGrande": false
    },
    "esperado": {
      "pago": 0
    }
  },
  {
    "nombre": "Federal, 1 year 3 months",
    "origen": {
      "tipo": "recalculado",
      "detalle": "2 days × 1 year = 2, minimum 5 days; 5 / 5 × 1,000 = 1,000."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "federal",
      "anios": 1,
      "meses": 3,
      "semanal": 1000,
      "diasSemana": 5,
      "nominaGrande": false
    },
    "esperado": {
      "pago": 1000,
      "dias": 5
    }
  },
  {
    "nombre": "Federal, 6 years",
    "origen": {
      "tipo": "recalculado",
      "detalle": "12 days / 5 × 1,000 = 2,400."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "federal",
      "anios": 6,
      "meses": 0,
      "semanal": 1000,
      "diasSemana": 5,
      "nominaGrande": false
    },
    "esperado": {
      "pago": 2400,
      "dias": 12
    }
  }
]);
