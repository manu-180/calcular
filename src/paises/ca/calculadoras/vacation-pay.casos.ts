import { definirCasos } from "@/motor/calculo";
import calculadora from "./vacation-pay";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario, 2 years",
    "origen": {
      "tipo": "recalculado",
      "detalle": "4% of 50,000 = 2,000; 2 weeks."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "salario": 50000,
      "anios": 2
    },
    "esperado": {
      "pago": 2000,
      "tasa": 4,
      "semanas": 2
    }
  },
  {
    "nombre": "Ontario, 6 years",
    "origen": {
      "tipo": "recalculado",
      "detalle": "6% of 50,000 = 3,000; 3 weeks."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "salario": 50000,
      "anios": 6
    },
    "esperado": {
      "pago": 3000,
      "tasa": 6,
      "semanas": 3
    }
  },
  {
    "nombre": "Federal, 12 years",
    "origen": {
      "tipo": "recalculado",
      "detalle": "8% after 10 years: 60,000 × 8% = 4,800; 4 weeks."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "federal",
      "salario": 60000,
      "anios": 12
    },
    "esperado": {
      "pago": 4800,
      "tasa": 8,
      "semanas": 4
    }
  },
  {
    "nombre": "Alberta, first year",
    "origen": {
      "tipo": "recalculado",
      "detalle": "4% of wages, no vacation time yet."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "ab",
      "salario": 20000,
      "anios": 0
    },
    "esperado": {
      "pago": 800,
      "semanas": 0
    }
  }
]);
