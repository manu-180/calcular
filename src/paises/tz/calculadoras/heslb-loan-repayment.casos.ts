import { definirCasos } from "@/motor/calculo";
import calculadora from "./heslb-loan-repayment";

export default definirCasos(calculadora, [
  {
    "nombre": "TSh 1,200,000 basic salary",
    "origen": {
      "tipo": "recalculado",
      "url": "https://www.heslb.go.tz/loanrepayment/about-loan-repayment",
      "detalle": "15% = 180,000 a month."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "basico": 1200000,
      "saldo": null
    },
    "esperado": {
      "mensual": 180000,
      "anual": 2160000,
      "meses": null
    }
  },
  {
    "nombre": "Balance of TSh 10 million",
    "origen": {
      "tipo": "recalculado",
      "detalle": "10,000,000 / 180,000 = 55.6, so 56 months."
    },
    "fecha": "2026-10-17",
    "entrada": {
      "basico": 1200000,
      "saldo": 10000000
    },
    "esperado": {
      "meses": 56
    }
  },
]);
