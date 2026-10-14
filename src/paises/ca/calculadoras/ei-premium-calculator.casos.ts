import { definirCasos } from "@/motor/calculo";
import calculadora from "./ei-premium-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "$50,000 outside Quebec",
    "origen": {
      "tipo": "recalculado",
      "detalle": "50,000 × 1.63% = 815; employer 50,000 × 2.282% = 1,141."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 50000,
      "lugar": "canada"
    },
    "esperado": {
      "empleado": 815,
      "empleador": 1141,
      "total": 1956
    }
  },
  {
    "nombre": "$80,000 in Quebec, capped",
    "origen": {
      "tipo": "recalculado",
      "detalle": "68,900 × 1.30% = 895.70 (T4127 maximum); employer 68,900 × 1.82% = 1,253.98."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 80000,
      "lugar": "qc"
    },
    "esperado": {
      "empleado": 895.7,
      "empleador": 1253.98,
      "asegurable": 68900
    }
  },
  {
    "nombre": "At the maximum outside Quebec",
    "origen": {
      "tipo": "recalculado",
      "detalle": "68,900 × 1.63% = 1,123.07 (T4127 maximum)."
    },
    "fecha": "2026-10-14",
    "entrada": {
      "ingreso": 68900,
      "lugar": "canada"
    },
    "esperado": {
      "empleado": 1123.07,
      "empleador": 1572.3
    }
  }
]);
