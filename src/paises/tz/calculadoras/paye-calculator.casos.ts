import { definirCasos } from "@/motor/calculo";
import calculadora from "./paye-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 1,000,000 a month",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/income-tax-for-individuals",
      "detalle": "NSSF 10% = 100,000. Taxable 900,000. Tax 20,000 + 48,000 + 140,000 × 25% = 103,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 1000000,
      "aporte": "10",
      "empleo": "primary",
      "residencia": "resident"
    },
    "esperado": {
      "paye": 103000,
      "gravable": 900000,
      "nssf": 100000,
      "marginal": 25
    }
  },
  {
    "nombre": "TSh 500,000 a month",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Taxable 450,000. Tax 180,000 × 8% = 14,400."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 500000,
      "aporte": "10",
      "empleo": "primary",
      "residencia": "resident"
    },
    "esperado": {
      "paye": 14400,
      "marginal": 8
    }
  },
  {
    "nombre": "TSh 2,000,000 a month",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Taxable 1,800,000. Tax 128,000 + 800,000 × 30% = 368,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 2000000,
      "aporte": "10",
      "empleo": "primary",
      "residencia": "resident"
    },
    "esperado": {
      "paye": 368000,
      "marginal": 30
    }
  },
  {
    "nombre": "TSh 300,000 is tax free after NSSF",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Taxable 270,000 is within the nil band."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 300000,
      "aporte": "10",
      "empleo": "primary",
      "residencia": "resident"
    },
    "esperado": {
      "paye": 0,
      "gravable": 270000
    }
  },
  {
    "nombre": "Secondary employment",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/pay-as-you-earn",
      "detalle": "Taxable 360,000 × 30% = 108,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 400000,
      "aporte": "10",
      "empleo": "secondary",
      "residencia": "resident"
    },
    "esperado": {
      "paye": 108000
    }
  },
  {
    "nombre": "Non-resident employee",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.tra.go.tz/page/pay-as-you-earn",
      "detalle": "15% of gross 1,000,000 = 150,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 1000000,
      "aporte": "10",
      "empleo": "primary",
      "residencia": "non-resident"
    },
    "esperado": {
      "paye": 150000
    }
  },
]);
