import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 1,000,000 with 12 employees",
    "origen": {
      "tipo": "recalculado",
      "detalle": "NSSF 10% = 100,000, SDL 3.5% = 35,000, WCF 0.5% = 5,000. Cost 1,140,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 1000000,
      "aporte": "10",
      "empleados": 12
    },
    "esperado": {
      "costo": 1140000,
      "nssf": 100000,
      "sdl": 35000,
      "wcf": 5000
    }
  },
  {
    "nombre": "Small business with five employees",
    "origen": {
      "tipo": "recalculado",
      "detalle": "No SDL. Cost 1,000,000 + 100,000 + 5,000 = 1,105,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 1000000,
      "aporte": "10",
      "empleados": 5
    },
    "esperado": {
      "costo": 1105000,
      "sdl": 0
    }
  },
]);
