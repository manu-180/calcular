import { definirCasos } from "@/motor/calculo";
import calculadora from "./net-salary-calculator";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 1,000,000 gross",
    "origen": {
      "tipo": "recalculado",
      "detalle": "1,000,000 − NSSF 100,000 − PAYE 103,000 = 797,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 1000000,
      "aporte": "10",
      "heslb": false,
      "basico": null
    },
    "esperado": {
      "neto": 797000,
      "paye": 103000,
      "nssf": 100000
    }
  },
  {
    "nombre": "With HESLB on a basic salary of 800,000",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.heslb.go.tz/loanrepayment/about-loan-repayment",
      "detalle": "HESLB 15% × 800,000 = 120,000. Net 797,000 − 120,000 = 677,000."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 1000000,
      "aporte": "10",
      "heslb": true,
      "basico": 800000
    },
    "esperado": {
      "neto": 677000,
      "heslb": 120000
    }
  },
  {
    "nombre": "Employer pays all of NSSF",
    "origen": {
      "tipo": "recalculado",
      "detalle": "Taxable 500,000. Tax 230,000 × 8% = 18,400. Net 481,600."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "bruto": 500000,
      "aporte": "0",
      "heslb": false,
      "basico": null
    },
    "esperado": {
      "neto": 481600,
      "nssf": 0,
      "paye": 18400
    }
  },
]);
