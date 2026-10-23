import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Lease with TSh 12 million rent a year",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/stamp-duty",
      "detalle": "1% × 12,000,000 = 120,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "documento": "lease",
      "valor": 12000000
    },
    "esperado": {
      "impuesto": 120000
    }
  },
  {
    "nombre": "Power of attorney",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Fixed TSh 2,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "documento": "agreement",
      "valor": null
    },
    "esperado": {
      "impuesto": 2000
    }
  },
  {
    "nombre": "Memorandum of association",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Fixed TSh 10,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "documento": "memorandum",
      "valor": null
    },
    "esperado": {
      "impuesto": 10000
    }
  },
]);
