import { definirCasos } from "@/motor/calculo";
import calculadora from "./capital-gains-tax-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "Resident sells a plot",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/capital-gains-tax",
      "detalle": "Gain 150,000,000 − 90,000,000 − 10,000,000 − 5,000,000 = 45,000,000. Tax 10% = 4,500,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "venta": 150000000,
      "conCosto": true,
      "costo": 90000000,
      "mejoras": 10000000,
      "gastosVenta": 5000000,
      "residencia": "resident",
      "vivienda": false
    },
    "esperado": {
      "impuesto": 4500000,
      "ganancia": 45000000,
      "tasa": 10
    }
  },
  {
    "nombre": "Non-resident",
    "origen": {
      "tipo": "recalculado",
      "detalle": "30% × 45,000,000 = 13,500,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "venta": 150000000,
      "conCosto": true,
      "costo": 90000000,
      "mejoras": 10000000,
      "gastosVenta": 5000000,
      "residencia": "non-resident",
      "vivienda": false
    },
    "esperado": {
      "impuesto": 13500000,
      "tasa": 30
    }
  },
  {
    "nombre": "No documents for the cost",
    "origen": {
      "tipo": "recalculado",
      "detalle": "3% × 150,000,000 = 4,500,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "venta": 150000000,
      "conCosto": false,
      "costo": null,
      "mejoras": null,
      "gastosVenta": null,
      "residencia": "resident",
      "vivienda": false
    },
    "esperado": {
      "impuesto": 4500000,
      "tasa": 3
    }
  },
  {
    "nombre": "Own home with a gain of TSh 12 million",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Exempt: gain up to 15,000,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "venta": 60000000,
      "conCosto": true,
      "costo": 48000000,
      "mejoras": 0,
      "gastosVenta": 0,
      "residencia": "resident",
      "vivienda": true
    },
    "esperado": {
      "impuesto": 0,
      "ganancia": 12000000
    }
  },
]);
