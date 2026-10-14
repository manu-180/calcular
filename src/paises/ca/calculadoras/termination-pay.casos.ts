import { definirCasos } from "@/motor/calculo";
import calculadora from "./termination-pay";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario, 4 years",
    "origen": {
      "tipo": "recalculado",
      "detalle": "ESA table: 4 years but less than 5 → 4 weeks × 1,200 = 4,800."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "anios": 4,
      "meses": 0,
      "semanal": 1200
    },
    "esperado": {
      "pago": 4800,
      "semanas": 4
    }
  },
  {
    "nombre": "Alberta, 1 year 6 months",
    "origen": {
      "tipo": "recalculado",
      "detalle": "More than 90 days but less than 2 years → 1 week."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "ab",
      "anios": 1,
      "meses": 6,
      "semanal": 1000
    },
    "esperado": {
      "semanas": 1,
      "pago": 1000
    }
  },
  {
    "nombre": "Federal, 2 years",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Canada Labour Code: 2 weeks after 3 months, 1 week per year only from 3 years."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "federal",
      "anios": 2,
      "meses": 0,
      "semanal": 1000
    },
    "esperado": {
      "semanas": 2
    }
  },
  {
    "nombre": "BC, 12 years",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Maximum 8 weeks."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "bc",
      "anios": 12,
      "meses": 0,
      "semanal": 900
    },
    "esperado": {
      "semanas": 8,
      "pago": 7200
    }
  },
  {
    "nombre": "Ontario, 2 months",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Less than 3 months: no notice."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "anios": 0,
      "meses": 2,
      "semanal": 1000
    },
    "esperado": {
      "semanas": 0,
      "pago": 0
    }
  },
  {
    "nombre": "Months out of range",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Extra months must be 0 to 11."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "anios": 1,
      "meses": 12,
      "semanal": 1000
    },
    "esperaError": true
  }
]);
