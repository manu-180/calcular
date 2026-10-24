import { definirCasos } from "@/motor/calculo";
import calculadora from "./tax-penalty-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Individual, TSh 2 million due, 2 months late",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/interest-penalties-offences",
      "detalle": "2.5% × 2,000,000 = 50,000, below 5 × 20,000 = 100,000. 100,000 × 2 = 200,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "impuesto": 2000000,
      "meses": 2,
      "persona": "individual"
    },
    "esperado": {
      "total": 200000,
      "porMes": 100000
    }
  },
  {
    "nombre": "Company, TSh 40 million due, 3 months late",
    "origen": {
      "tipo": "recalculado",
      "detalle": "2.5% × 40,000,000 = 1,000,000 a month. Total 3,000,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "impuesto": 40000000,
      "meses": 3,
      "persona": "company"
    },
    "esperado": {
      "total": 3000000,
      "minimo": 300000
    }
  },
]);
