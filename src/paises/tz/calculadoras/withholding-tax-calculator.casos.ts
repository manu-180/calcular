import { definirCasos } from "@/motor/calculo";
import calculadora from "./withholding-tax-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Service fee to a resident",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/withholding-tax",
      "detalle": "5% × 1,000,000 = 50,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 1000000,
      "tipo": "service-fees",
      "residencia": "resident"
    },
    "esperado": {
      "retencion": 50000,
      "tasa": 5
    }
  },
  {
    "nombre": "Service fee to a non-resident",
    "origen": {
      "tipo": "recalculado",
      "detalle": "15% × 1,000,000 = 150,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 1000000,
      "tipo": "service-fees",
      "residencia": "non-resident"
    },
    "esperado": {
      "retencion": 150000
    }
  },
  {
    "nombre": "Commercial rent",
    "origen": {
      "tipo": "recalculado",
      "detalle": "10% × 2,000,000 = 200,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 2000000,
      "tipo": "rent",
      "residencia": "resident"
    },
    "esperado": {
      "retencion": 200000
    }
  },
  {
    "nombre": "Goods to Government from a non-resident",
    "origen": {
      "tipo": "recalculado",
      "detalle": "No rate listed."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "importe": 1000000,
      "tipo": "goods-government",
      "residencia": "non-resident"
    },
    "esperaError": true
  },
]);
