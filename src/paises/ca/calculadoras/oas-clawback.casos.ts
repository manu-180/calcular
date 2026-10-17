import { definirCasos } from "@/motor/calculo";
import calculadora from "./oas-clawback";

export default definirCasos(calculadora, [
  {
    "nombre": "2026 income of $110,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "(110,000 − 95,323) × 15% = 2,201.55."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "anio": "2026",
      "ingreso": 110000,
      "oas": 8800
    },
    "esperado": {
      "repago": 2201.55,
      "conservas": 6598.45,
      "exceso": 14677
    }
  },
  {
    "nombre": "Whole pension recovered",
    "origen": {
      "tipo": "recalculado",
      "detalle": "(200,000 − 93,454) × 15% = 15,981.90, capped at the 8,500 received."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "anio": "2025",
      "ingreso": 200000,
      "oas": 8500
    },
    "esperado": {
      "repago": 8500,
      "conservas": 0
    }
  },
  {
    "nombre": "Under the threshold",
    "origen": {
      "tipo": "recalculado",
      "detalle": "90,000 < 90,997 (2024)."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "anio": "2024",
      "ingreso": 90000,
      "oas": 8000
    },
    "esperado": {
      "repago": 0
    }
  }
]);
