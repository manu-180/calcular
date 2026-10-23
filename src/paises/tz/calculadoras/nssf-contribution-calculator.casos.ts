import { definirCasos } from "@/motor/calculo";
import calculadora from "./nssf-contribution-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 1,000,000, split 10% and 10%",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.nssf.go.tz/pages/payment-of-contributions",
      "detalle": "20% = 200,000: 100,000 each."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 1000000,
      "aporte": "10"
    },
    "esperado": {
      "total": 200000,
      "empleado": 100000,
      "empleador": 100000
    }
  },
  {
    "nombre": "Split 5% and 15%",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Employee 25,000, employer 75,000 on 500,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 500000,
      "aporte": "5"
    },
    "esperado": {
      "total": 100000,
      "empleado": 25000,
      "empleador": 75000
    }
  },
]);
