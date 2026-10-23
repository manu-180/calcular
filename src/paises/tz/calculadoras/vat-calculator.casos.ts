import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Add 18% to TSh 100,000",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/value-added-tax-vat",
      "detalle": "100,000 × 18% = 18,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 100000,
      "modo": "add",
      "tasa": "standard"
    },
    "esperado": {
      "iva": 18000,
      "total": 118000,
      "tasa": 18
    }
  },
  {
    "nombre": "Take VAT out of TSh 1,000,000",
    "origen": {
      "tipo": "recalculado",
      "detalle": "1,000,000 / 1.18 = 847,457.63. VAT 152,542.37."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 1000000,
      "modo": "remove",
      "tasa": "standard"
    },
    "esperado": {
      "neto": 847457.63,
      "iva": 152542.37
    }
  },
  {
    "nombre": "Electronic payment rate",
    "origen": {
      "tipo": "recalculado",
      "detalle": "100,000 × 16% = 16,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 100000,
      "modo": "add",
      "tasa": "electronic"
    },
    "esperado": {
      "iva": 16000,
      "tasa": 16
    }
  },
]);
