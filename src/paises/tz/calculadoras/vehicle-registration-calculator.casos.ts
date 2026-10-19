import { definirCasos } from "@/motor/calculo";
import calculadora from "./vehicle-registration-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "1,500 cc car",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/motor",
      "detalle": "Licence 200,000 + registration tax 250,000 + HIV levy 100,000 = 550,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "motor": "cc-1500"
    },
    "esperado": {
      "total": 550000,
      "hiv": 100000
    }
  },
  {
    "nombre": "3,000 cc car",
    "origen": {
      "tipo": "recalculado",
      "detalle": "300,000 + 250,000 + 200,000 = 750,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "motor": "cc-over"
    },
    "esperado": {
      "total": 750000
    }
  },
]);
