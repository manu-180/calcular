import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 100,000 a year ago",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.nbs.go.tz/",
      "detalle": "Annual headline inflation of 4.3% to September 2026: 104,300."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 100000
    },
    "esperado": {
      "actualizado": 104300,
      "tasa": 4.3,
      "periodo": "September 2025 to September 2026"
    }
  },
]);
