import { definirCasos } from "@/motor/calculo";
import calculadora from "./wcf-contribution-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Payroll of TSh 20 million",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.wcf.go.tz/",
      "detalle": "0.5% × 20,000,000 = 100,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "nomina": 20000000
    },
    "esperado": {
      "wcf": 100000,
      "anual": 1200000
    }
  },
]);
