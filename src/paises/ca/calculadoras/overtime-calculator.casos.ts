import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Ontario 5 × 10 hours",
    "origen": {
      "tipo": "recalculado",
      "detalle": "50 hours: 44 regular × 25 = 1,100; 6 × 37.50 = 225."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "tarifa": 25,
      "dias": 5,
      "horasDia": 10
    },
    "esperado": {
      "total": 1325,
      "extra": 6,
      "regulares": 44
    }
  },
  {
    "nombre": "BC 4 × 13 hours",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Each day: 8 regular, 4 at 1.5, 1 at 2. Week: 32 regular (640), 16 × 30 = 480, 4 × 40 = 160."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "bc",
      "tarifa": 20,
      "dias": 4,
      "horasDia": 13
    },
    "esperado": {
      "total": 1280,
      "extra": 16,
      "doble": 4
    }
  },
  {
    "nombre": "Alberta 5 × 9 hours",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Daily 5 hours vs weekly 1 hour: daily wins. 40 × 20 + 5 × 30 = 950."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "ab",
      "tarifa": 20,
      "dias": 5,
      "horasDia": 9
    },
    "esperado": {
      "total": 950,
      "extra": 5
    }
  },
  {
    "nombre": "Federal 6 × 8 hours",
    "origen": {
      "tipo": "recalculado",
      "detalle": "No daily overtime; 48 − 40 = 8 weekly. 40 × 30 + 8 × 45 = 1,560."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "federal",
      "tarifa": 30,
      "dias": 6,
      "horasDia": 8
    },
    "esperado": {
      "total": 1560,
      "extra": 8
    }
  },
  {
    "nombre": "No wage",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Hourly wage must be above zero."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "jurisdiccion": "on",
      "tarifa": 0,
      "dias": 5,
      "horasDia": 8
    },
    "esperaError": true
  }
]);
